<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateTipoSangreAPIRequest;
use App\Http\Requests\API\UpdateTipoSangreAPIRequest;
use App\Models\TipoSangre;
use App\Repositories\TipoSangreRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class TipoSangreController
 * @package App\Http\Controllers\API
 */

class TipoSangreAPIController extends AppBaseController
{
    /** @var  TipoSangreRepository */
    private $tipoSangreRepository;

    public function __construct(TipoSangreRepository $tipoSangreRepo)
    {
        $this->tipoSangreRepository = $tipoSangreRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/tipoSangres",
     *      summary="Get a listing of the TipoSangres.",
     *      tags={"TipoSangre"},
     *      description="Get all TipoSangres",
     *      produces={"application/json"},
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  type="array",
     *                  @SWG\Items(ref="#/definitions/TipoSangre")
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function index(Request $request)
    {
        $this->tipoSangreRepository->pushCriteria(new RequestCriteria($request));
        $this->tipoSangreRepository->pushCriteria(new LimitOffsetCriteria($request));
        $tipoSangres = $this->tipoSangreRepository->all();

        return $this->sendResponse($tipoSangres->toArray(), 'Tipo Sangres retrieved successfully');
    }

    /**
     * @param CreateTipoSangreAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/tipoSangres",
     *      summary="Store a newly created TipoSangre in storage",
     *      tags={"TipoSangre"},
     *      description="Store TipoSangre",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="TipoSangre that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/TipoSangre")
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/TipoSangre"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateTipoSangreAPIRequest $request)
    {
        $input = $request->all();

        $tipoSangres = $this->tipoSangreRepository->create($input);

        return $this->sendResponse($tipoSangres->toArray(), 'Tipo Sangre saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/tipoSangres/{id}",
     *      summary="Display the specified TipoSangre",
     *      tags={"TipoSangre"},
     *      description="Get TipoSangre",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of TipoSangre",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/TipoSangre"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function show($id)
    {
        /** @var TipoSangre $tipoSangre */
        $tipoSangre = $this->tipoSangreRepository->findWithoutFail($id);

        if (empty($tipoSangre)) {
            return $this->sendError('Tipo Sangre not found');
        }

        return $this->sendResponse($tipoSangre->toArray(), 'Tipo Sangre retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateTipoSangreAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/tipoSangres/{id}",
     *      summary="Update the specified TipoSangre in storage",
     *      tags={"TipoSangre"},
     *      description="Update TipoSangre",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of TipoSangre",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="TipoSangre that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/TipoSangre")
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/TipoSangre"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateTipoSangreAPIRequest $request)
    {
        $input = $request->all();

        /** @var TipoSangre $tipoSangre */
        $tipoSangre = $this->tipoSangreRepository->findWithoutFail($id);

        if (empty($tipoSangre)) {
            return $this->sendError('Tipo Sangre not found');
        }

        $tipoSangre = $this->tipoSangreRepository->update($input, $id);

        return $this->sendResponse($tipoSangre->toArray(), 'TipoSangre updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/tipoSangres/{id}",
     *      summary="Remove the specified TipoSangre from storage",
     *      tags={"TipoSangre"},
     *      description="Delete TipoSangre",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of TipoSangre",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  type="string"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function destroy($id)
    {
        /** @var TipoSangre $tipoSangre */
        $tipoSangre = $this->tipoSangreRepository->findWithoutFail($id);

        if (empty($tipoSangre)) {
            return $this->sendError('Tipo Sangre not found');
        }

        $tipoSangre->delete();

        return $this->sendResponse($id, 'Tipo Sangre deleted successfully');
    }
}
