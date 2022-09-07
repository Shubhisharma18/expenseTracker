import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
const baseURI= 'http://localhost:8080';


//code you need to fetch data from server

export const apiSlice= createApi({
    baseQuery: fetchBaseQuery({baseUrl:baseURI}),
    endpoints: builder =>({     
        getCategories: builder.query({
            query:()=> '/api/categories',
            providesTags:['categories']
        }),
        getLabels: builder.query({
            query: ()=> '/api/labels',
            providesTags: ['transaction']
        }),
        //new transaction
        addTransaction: builder.mutation({
            query:(initialTransaction)=>({
                //THIS IS POST REQUEST ON TRANSACTION /api/transaction
                url: '/api/transaction',
                method: "POST",
                body: initialTransaction 
            }),
            invalidatesTags:['transaction']
        }),
        //delete record
        deleteTransaction: builder.mutation({
            query: recordId => ({
                //del rqst on transaction /api/transaxction
                url:'/api/transaction',
                method: "DELETE",
                body: recordId

            }),
            invalidatesTags:['transaction']
        })
    })
   
})


export default apiSlice;