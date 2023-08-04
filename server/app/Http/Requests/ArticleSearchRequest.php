<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleSearchRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
   */
  public function rules(): array
  {
    return [
      'filters' => 'array',
      'filters.topics' => 'array',
      'filters.sources' => 'array',
      'filters.dates' => 'array|min:2|max:2',
      'filters.keyword' => 'string',
      'page' => 'required|integer',
      'pageSize' => 'required|integer',
    ];
  }
}
