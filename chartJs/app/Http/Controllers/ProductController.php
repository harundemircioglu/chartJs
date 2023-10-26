<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function createProduct(Request $request)
    {
        $createProduct = [
            'product_name' => $request->input('product_name'),
            'product_image' => $request->input('product_image'),
            'product_price' => $request->input('product_price'),
            'category_id' => $request->input('category_id'),
        ];

        Product::create($createProduct);

        return response()->json([
            'messages' => 'Created',
            'product' => $createProduct,
        ]);
    }

    public function getProducts()
    {
        $products = Product::with("category")->get();

        return response()->json($products);
    }

    public function getProductById($id)
    {
        $product = Product::find($id);

        return response()->json($product);
    }

    public function updateProduct($id, Request $request)
    {
        $product = Product::find($id);
        $product->product_name = $request->input('product_name');
        $product->product_image = $request->input('product_image');
        $product->product_price = $request->input('product_price');
        $product->save();

        return response()->json([
            'messages' => 'Updated',
            'product' => $product,
        ]);
    }

    public function deleteProduct($id)
    {
        $product = Product::find($id);
        $product->delete();

        return response()->json([
            'messages' => 'Deleted',
            'product' => $product,
        ]);
    }
}
