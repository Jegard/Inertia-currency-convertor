<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConverstionStoreRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'amount' => 'required|numeric',
            'base' => 'required|string',
            'symbol' => 'required|string',
        ];
    }
}
