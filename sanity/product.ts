import { defineType, defineField } from "sanity"

defineField


export const product = {
    name: "product",
    type: "document",
    title: "productModel",
    fields: [
        {
            name: "name",
            title: "Product Name",
            type: "string",
        },
        {
            name: "producttype",
            title: "Product Type",
            type: "string",
        },
        defineField({
            name: "category",
            title: "Product Category",
            type: "reference",
            to : [
                {
                    type : "categories"
                }
            ]   
        }),
        // defineField({
        //     name: "category",
        //     title: "Product Category",
        //     type : "array",
        //     of : [{

        //         type: "reference",
        //         to : [
        //             {
        //                 type : "categories"
        //             }
        //         ]
        //     }]     
        // }),
        defineField({
            name: "size",
            title: "Sizes of Product",
            type: "array",
            of : [
                    {
                        type : "reference",
                        to : [ {
                            type : "sizes"
                        }]
                    }
                ]
            
        }),
        {
            name: "description",
            title: "Product Description",
            type: "text",
        },
        {
            name: "image",
            title: "Product Image",
            type: "image",
        },
        {
            name: "price",
            title: "Product Price",
            type: "number",
        }
    ]
}

export const sizes = {
    name: "sizes",
    type: "document",
    title: "Sizes",
    fields: [
        {
            name: "name",
            title: "Size Name",
            type: "string",
        }
    ]
}

export const categories = {
    name: "categories",
    type: "document",
    title: "Categories",
    fields: [
        {
            name: "name",
            title: "Category Name",
            type: "string",
        }
    ]
}

/* 

*[_type == "product" && category->name == "kids"]

*[_type == "product" && category->name == "kids"]{name , price,
  'category': category->name , 
'size' : size[]->name}

complex query to get all of this data  when category is also an array o references

*[_type == "product"]{
  name , 
  description,
  producttype,
  image , 
  price, 
  'category': category[] {
    _type == 'reference' => @->,
    _type != 'reference' => @
  }{name},
'size': size[] {
    _type == 'reference' => @->,
    _type != 'reference' => @
  }{name}
}

/*

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


*/