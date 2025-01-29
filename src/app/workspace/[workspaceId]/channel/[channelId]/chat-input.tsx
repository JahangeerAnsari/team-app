import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { useChannelId } from "@/hooks/use-channel-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";
const Editor = dynamic(() => import("@/components/editor"),{ssr:false}); 
interface ChatInputProps{
    placeholder:string
}
const ChatInput = ({placeholder}: ChatInputProps) => {
  const editorRef = useRef<Quill | null>(null);
  // we are using simple pending state
  const [isPending,setIsPending] = useState(false)
  // clear editor after send msg
  const [editorKey, setEditorKey] = useState(0)
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId()
  const { mutate: createMessage } = useCreateMessage();
  // Handle submit the chat form (body and image)
  const handleSubmit = async ({body,image}:{body:string, image:File | null}) => {
   
    try {
      setIsPending(true)
       createMessage(
         {
           workspaceId,
           channelId,
           body,
         },
         { throwError: true }
       );
       setEditorKey((prev) => prev + 1);
    } catch (error) {
       toast.error("Failed to send messages.")
    } finally {
      setIsPending(false)
    }
     
  }
  
  return (
    <div className="px-5 w-full">
      <Editor
        key={editorKey}
        onSubmit={ handleSubmit}
        placeholder={placeholder}
        disabled={isPending}
        innerRef={editorRef}
        variant="create"
      />
    </div>
  );
};
 
export default ChatInput;