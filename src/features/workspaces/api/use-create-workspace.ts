import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import {  Id } from "../../../../convex/_generated/dataModel";
// import Error from "next/error";

type RequestType = {name:string} ;
type ResponseType = Id<"workspaces"> | null;
type Options = {
    onSuccess?: (data:ResponseType) => void;
    onError?: (error:Error) => void;
    onSettled?: () => void;
    throwError?: boolean;
}
export const useCreateWorkspace = () => {
    // let set & get data error isPending all 
    const [data,setData] = useState<ResponseType>(null)
    const [error, setError] = useState<Error | null>(null);
    // const [isPending, setIsPending] = useState(false);
    // const [isError, setIsError] = useState(false);
    // const [isSuccess, setIsSuccess] = useState(false);
    // const [isSettled, setIsSettled] = useState(false);
    const [status,setStatus] = useState<"success" | "pending" | "error" | "settled" | null>(null)
    const isPending = useMemo(() => status === "pending", [status]);
    const isSuccess = useMemo(() => status === "success", [status]);
    const isSettled = useMemo(() => status === "settled", [status]);
    const isError = useMemo(() => status === "error", [status]);
    const mutation = useMutation(api.workspaces.create);
    const mutate = useCallback(async (values: RequestType, options?: Options) => {
        try {
            // updataing state
            setData(null);
            setError(null);
            //    no need to set the other state only pending 
            setStatus("pending")
            const response = await mutation(values);
            options?.onSuccess?.(response);
            return response;
        } catch(error) {
            options?.onError?.(error as Error);
            if (options?.throwError) {
                throw error
            }
        } finally {
            setStatus("settled")
            options?.onSettled?.();
        }
    }, [mutation]);
    return {
        mutate,
        error,
        isError,
        isPending,
        isSettled,
        isSuccess,
        data,
        
    }
}