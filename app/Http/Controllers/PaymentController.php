<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PaymentController extends Controller
{
    // Función interna para saltarnos el archivo config/paypal.php que está fallando
    private function getPayPalProvider()
    {
        $provider = new PayPalClient;

        $paypalConfig = [
            'mode'    => env('PAYPAL_MODE', 'sandbox'),
            'sandbox' => [
                'client_id'         => env('PAYPAL_SANDBOX_CLIENT_ID'),
                'client_secret'     => env('PAYPAL_SANDBOX_CLIENT_SECRET'),
                'app_id'            => 'APP-80W284485P519543T',
            ],
            'payment_action' => 'Sale',
            'currency'       => env('PAYPAL_CURRENCY', 'USD'),
            'notify_url'     => '',
            'locale'         => 'en_US',
            'validate_ssl'   => true,
        ];

        $provider->setApiCredentials($paypalConfig);
        $provider->getAccessToken();

        return $provider;
    }

    public function createOrder(Request $request)
    {
        try {
            $provider = $this->getPayPalProvider();
            $price = $request->input('price', 10.00);

            $response = $provider->createOrder([
                "intent" => "CAPTURE",
                "purchase_units" => [
                    [
                        "amount" => [
                            "currency_code" => "USD",
                            "value" => $price
                        ]
                    ]
                ]
            ]);

            if (isset($response['id']) && $response['id'] != null) {
                return response()->json(['id' => $response['id']]);
            }

            return response()->json(['error' => 'PayPal no devolvió un ID', 'details' => $response], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en el servidor', 'message' => $e->getMessage()], 500);
        }
    }

    public function captureOrder(Request $request)
    {
        try {
            $provider = $this->getPayPalProvider();
            $response = $provider->capturePaymentOrder($request->input('orderID'));

            if (isset($response['status']) && $response['status'] == 'COMPLETED') {
                return response()->json(['status' => 'success', 'data' => $response]);
            }

            return response()->json(['error' => 'El pago no se pudo completar'], 400);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al capturar el pago', 'message' => $e->getMessage()], 500);
        }
    }
}
