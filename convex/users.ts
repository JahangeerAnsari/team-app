import {query} from './_generated/server'
import { auth } from './auth'
// create user 
export const current = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        console.log("userId", userId);
        if (userId === null) {
            return null;
        }
        return await ctx.db.get(userId)
    },
    
})