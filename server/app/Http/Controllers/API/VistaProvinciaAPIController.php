<?php

namespace App\Http\Controllers\API;

use App\Models\VistaProvincia;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

/**
 * Class VistaProvinciaController
 * @package App\Http\Controllers\API
 */

class VistaProvinciaAPIController extends AppBaseController
{
    public function index(Request $request)
    {
        $vista = VistaProvincia::fromView()->get();

        return $this->sendResponse($vista->toArray(), 'VistaProvincias retrieved successfully');
    }

    public function show($id)
    {

        $vista = VistaProvincia::fromView()->where('id', '=', $id)->get();

        return $this->sendResponse($vista->toArray(), 'VistaProvincias retrieved successfully');
    }
}