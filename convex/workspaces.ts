import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";


export const create = mutation({
    args: {
       name:v.string() 
    },
    handler: async (ctx, args) => {
        // lets check user is loggin 
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            throw new Error("Unauthorized")
        }
        // TODO :JOIN CODE FUNCTIONALITY
        const joinCode = "123456";
        // every time we create data in convex it return id not data
        const workspaceId = await ctx.db.insert("workspaces", {
            name: args.name,
            userId,
            joinCode
        });
        // we can check 
        // const workspace = await ctx.db.get(workspaceId)
        return workspaceId;
    }
})

// GET API(get the workspaces)
export const get = query({
    args: {},
    handler: async (ctx) => {
     return  await ctx.db.query('workspaces').collect()
    }
})