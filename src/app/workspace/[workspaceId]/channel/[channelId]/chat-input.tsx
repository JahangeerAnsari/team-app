import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef } from "react";
const Editor = dynamic(() => import("@/components/editor"),{ssr:false}); 
interface ChatInputProps{
    placeholder:string
}
const ChatInput = ({placeholder}: ChatInputProps) => {
  const editorRef = useRef<Quill | null>(null);
  // Handle submit the chat form (body and image)
  const handleSubmit = ({body,image}:{body:string, image:File | null}) => {
     console.log("body and image",body, image);
     
  }
  return (
    <div className="px-5 w-full">
      <Editor
        onSubmit={ handleSubmit}
        placeholder={placeholder}
        disabled={false}
        innerRef={editorRef}
        variant="create"
      />
    </div>
  );
};
 
export default ChatInput;