<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function createCategory(Request $request)
    {
        $createCategory = [
            'category_name' => $request->input('category_name'),
        ];

        Category::create($createCategory);

        return response()->json([
            'messages' => 'Created',
            'category' => $createCategory
        ]);
    }

    public function getCategory()
    {
        $categories = Category::all();

        return response()->json($categories);
    }

    public function getCategoryById($id)
    {
        $category = Category::find($id);

        return response()->json($category);
    }

    public function updateCategory($id, Request $request)
    {
        $category = Category::find($id);
        $category->category_name = $request->input('category_name');
        $category->save();
        return response()->json([
            'messages' => 'Updated',
            'category' => $category
        ]);
    }

    public function deleteCategory($id)
    {
        $category = Category::find($id);
        $category->delete();

        return response()->json([
            'messages' => 'Deleted',
            'category' => $category,
        ]);
    }
}
