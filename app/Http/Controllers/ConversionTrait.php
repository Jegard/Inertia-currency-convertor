<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

trait ConversionTrait
{
    protected function getRate($base = 'GBP', $symbols = 'EUR')
    {
        return Http::withUrlParameters([
            'endpoint' => 'https://api.apilayer.com/fixer/latest',
            'base' => $base,
            'symbols' => $symbols,
        ])
            ->withHeaders([
                'apikey' => 'R6S4dUnvbAcoFFpAKy8NNfd2PkarieLs'
            ])
            ->timeout(60)
            ->get('{+endpoint}?base={+base}&symbols={+symbols}');
    }
}
