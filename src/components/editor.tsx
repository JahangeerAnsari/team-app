import Quill, { Delta, Op, type QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";
import { Button } from "./ui/button";
import { ImageIcon, Smile } from "lucide-react";
import Hint from "./hint";
type EditorValue = {
  image: File | null;
  body: string;
};
interface EditorProps {
  variant?: "create" | "update";
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
}
const Editor = ({
  variant = "create",
  onSubmit,
  defaultValue=[],
  disabled=false,
  innerRef,
  onCancel,
  placeholder="Write Something....",
}: EditorProps) => {
  const[text, setText]= useState('')
  const containerRef = useRef<HTMLDivElement>(null);
    const submitRef = useRef(onSubmit);
    const placeholderRef = useRef(placeholder);
    const quillRef = useRef<Quill | null>(null);
    const disabledRef = useRef(disabled);
    const defaultValueRef = useRef(defaultValue);
    useLayoutEffect(() => {
        submitRef.current = onSubmit;
        placeholderRef.current = placeholder;
        disabledRef.current = disabled;
        defaultValueRef.current = defaultValue;
    })
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );
    const options: QuillOptions = {
        theme: "snow",
        placeholder:placeholderRef.current
    };
    // lets focus to the text editor
    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();
    // after send msg i wannt to focus to text input
    if (innerRef) {
      innerRef.current = quill;
    }
    // set text to the quill
    quill.setContents(defaultValueRef.current);
    setText(quill.getText())
    // added event to change every text change(every strock)
    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText())
    })
    return () => {
      // when event(update mean clear the events)
      quill.off(Quill.events.TEXT_CHANGE)
      if (container) {
        container.innerHTML = "";
      }
      // if there is current 
      if (quillRef.current) {
        quillRef.current = null
      }
      if (innerRef) {
        innerRef.current = null
      }
    };
  }, [innerRef]);
  return (
    <div className="flex flex-col">
      <div
        className="flex flex-col border border-slate-200 rounded-md
            overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white
            "
      >
        <div ref={containerRef} className="h-full ql-custom" />
        <div className="flex px-2 pb-2 z-[5]">
          <Hint label="Hide formatting">
            <Button
              disabled={false}
              size="iconSm"
              variant="ghost"
              onClick={() => {}}
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          <Hint label="Emoji">
            <Button
              disabled={false}
              size="iconSm"
              variant="ghost"
              onClick={() => {}}
            >
              <Smile className="size-4" />
            </Button>
          </Hint>
          {variant === "create" && (
            <Hint label="Image">
              <Button
                disabled={false}
                size="iconSm"
                variant="ghost"
                onClick={() => {}}
              >
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          )}
          {variant === "update" && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {}}
                disabled={false}
              >
                Save
              </Button>
              <Button
                onClick={() => {}}
                disabled={false}
                size="sm"
                className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              >
                Cancel
              </Button>
            </div>
          )}

          {variant === "create" && (
            <Button
              disabled={false}
              onClick={() => {}}
              size="iconSm"
              className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
            >
              <MdSend />
            </Button>
          )}
        </div>
      </div>
      <div className="p-2 text-[10px] text-muted-foreground flex justify-end">
        <p>
          <strong>Shift + Return</strong> to add a new line
        </p>
      </div>
    </div>
  );
};

export default Editor;
