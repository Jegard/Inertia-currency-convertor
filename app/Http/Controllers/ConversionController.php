<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConverstionStoreRequest;
use App\Models\Conversion;
use Inertia\Inertia;

class ConversionController extends Controller
{
    use ConversionTrait;

    public function index()
    {
        return Inertia::render(
            'Conversion',
            [
                'conversions' => Conversion::orderBy('created_at', 'DESC')->get(),
                'availableCurrencies' => [
                    'GBP',
                    'EUR',
                    'USD',
                    'CAD',
                    'AUD',
                    'NZD',
                    'CHF',
                    'JPY',
                    'CNY',
                ]
            ]
        );
    }

    public function store(ConverstionStoreRequest $request)
    {
        $data = $request->all();
        $amount = $data['amount'];
        $rate = $this->getRate($data['base'], $data['symbol'])->json()["rates"][$data['symbol']];
        $converted = $data['amount'] * $rate;
        $conversion = Conversion::create([
            'base' => $data['base'],
            'symbol' => $data['symbol'],
            'amount' => $amount,
            'converted' => $converted,
            'rate' => $rate,
        ]);

        return redirect()->back()->with('success', $conversion);
    }
}
