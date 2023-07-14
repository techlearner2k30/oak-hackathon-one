"use client";

import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartContext from "../../themecontext/ThemeContext";
import Size from "@/app/components/singleproduct/size";
import ProductCounter from "@/app/components/singleproduct/productcounter";
import { client } from "@/lib/sanity.client";
import imageUrlBuilder from '@sanity/image-url'
import { SanityClient } from "sanity";


const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

const sizes = ["XS", "S", "M", "L", "XL"];

export default function ProductDetail({ params }: { params: { id: string } }) {
  const id = params?.id;
  console.log("id =>", id);

  const [productState, setProductState]: [any, any] = useState({});

  useEffect(() => {
    const productOutput = async () => {
      const res = await client.fetch(`*[_type=="product" && _id=="${params.id}"]{_id, name , price, image , description , 
        "category": category->name , 
      "size" : size[]->name}`);

      console.log("res", await res);

      const productDataaObj = {
        id: res[0]._id,
        title: res[0].name,
        category: res[0].category,
        description: res[0].description,
        price: res[0].price,
        image: urlFor(res[0].image).url(),
      }

      console.log("img ", urlFor(res[0].image).url());
      console.log("res ", productDataaObj);

      setProductState(productDataaObj);

    };
    productOutput();

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  const priceRef: any = useRef(0);

  const toastRun = () => {
    toast("Successfully added to cart");
  };

  function reducer(productData: Record<string, string | number>, action: any): Record<string, string | number> {
    switch (action.type) {
      case "update_size": {
        return {
          ...productData,
          size: action.updatedSize,
        };
      }
      case "add_quantity": {
        return {
          ...productData,
          quantity: Number(productData.quantity) + 1,
        };
      }
      case "subtract_quantity": {
        return {
          ...productData,
          quantity:
            Number(productData.quantity) > 1
              ? Number(productData.quantity) - 1
              : productData.quantity,
        };
      }
    }
    throw Error("Unknown action: " + action.type);
  }

  const [productData, dispatch] = useReducer(reducer, {
    size: "M",
    quantity: 1,
  });

  const [compCartState, setCompCartState]: [any, any] = useState();
  const CartContext_USE: any = useContext(CartContext);

  useEffect(() => {
    function abc() {
      if (compCartState && compCartState.unitPrice >= 0) {
        CartContext_USE.UpdateCart(compCartState);
      } else {
        console.log('npthing');
      }
    }
    abc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compCartState]);

  function handleSizeChange(e: any) {
    dispatch({
      type: "update_size",
      updatedSize: e.target.dataset.value,
    });
  }

  var prodObjItem: Record<
    string | number,
    string | number | Record<string | number, string | number>
  >;

  function addToCart(e: any) {
    prodObjItem = {
      id: id, title: productState?.title,
      imageurl: productState?.image,
      unitPrice: Number(priceRef?.current?.dataset.value),
      category: productState?.category,
      description: productState?.description
    };
    prodObjItem.specs = { [productData.size]: productData["quantity"] };
    setCompCartState(prodObjItem);
    toastRun();
  }

  return (
    <div className="flex flex-col md:flex-row gap-12 justify-center my-8">
      <div className="images_sec">
        <img src={productState.image} alt="Product" width={`275px`} height={`275px`} />
      </div>
      <div className="details_sec">
        <div>
          <h2 className="text-2xl font-bold">{productState?.title}</h2>
          <h3 className="text-xl text-gray-300">Dress</h3>
        </div>

        <Size
          sizes={sizes}
          productData={productData}
          handleSizeChange={handleSizeChange}
        />

        <ProductCounter productData={productData} dispatch={dispatch} />


        <div className="flex flex-col md:flex-row gap-12 mt-8 text-center">
          <button
            className="flex gap-2 bg-black text-white px-8 py-2 self-start items-center text-lg md:order-1 order-2"
            ref={priceRef}
            onClick={addToCart}
            data-value={productState.price}
            data-imageurl={productState.image}
            data-title={productState.title}
          >
            Add to Cart <AiOutlineShoppingCart />
          </button>
          <h3 className="text-3xl font-bold order-1 md:order-2">Price : $ {productState.price}</h3>
        </div>

        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 2000,
            style: {
              background: "#ececec",
              color: "green",
            },

            // Default options for specific types
            success: {
              duration: 2000,
            },
          }}
        />
      </div>
    </div>
  );
}

