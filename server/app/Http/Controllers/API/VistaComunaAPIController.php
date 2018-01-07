<?php

namespace App\Http\Controllers\API;

use App\Models\VistaComuna;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

/**
 * Class VistaComunaController
 * @package App\Http\Controllers\API
 */

class VistaComunaAPIController extends AppBaseController
{

    public function index(Request $request)
    {
        $vista = VistaComuna::fromView()->get();

        return $this->sendResponse($vista->toArray(), 'VistaComunas retrieved successfully');
    }

    public function show($id)
    {

        $vista = VistaComuna::fromView()->where('id', '=', $id)->get();

        return $this->sendResponse($vista->toArray(), 'VistaComunas retrieved successfully');
    }
}