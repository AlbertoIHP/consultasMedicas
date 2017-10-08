<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateDiagnosticoAtencionAPIRequest;
use App\Http\Requests\API\UpdateDiagnosticoAtencionAPIRequest;
use App\Models\DiagnosticoAtencion;
use App\Repositories\DiagnosticoAtencionRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class DiagnosticoAtencionController
 * @package App\Http\Controllers\API
 */

class DiagnosticoAtencionAPIController extends AppBaseController
{
    /** @var  DiagnosticoAtencionRepository */
    private $diagnosticoAtencionRepository;

    public function __construct(DiagnosticoAtencionRepository $diagnosticoAtencionRepo)
    {
        $this->diagnosticoAtencionRepository = $diagnosticoAtencionRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/diagnosticoAtencions",
     *      summary="Get a listing of the DiagnosticoAtencions.",
     *      tags={"DiagnosticoAtencion"},
     *      description="Get all DiagnosticoAtencions",
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
     *                  @SWG\Items(ref="#/definitions/DiagnosticoAtencion")
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
        $this->diagnosticoAtencionRepository->pushCriteria(new RequestCriteria($request));
        $this->diagnosticoAtencionRepository->pushCriteria(new LimitOffsetCriteria($request));
        $diagnosticoAtencions = $this->diagnosticoAtencionRepository->all();

        return $this->sendResponse($diagnosticoAtencions->toArray(), 'Diagnostico Atencions retrieved successfully');
    }

    /**
     * @param CreateDiagnosticoAtencionAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/diagnosticoAtencions",
     *      summary="Store a newly created DiagnosticoAtencion in storage",
     *      tags={"DiagnosticoAtencion"},
     *      description="Store DiagnosticoAtencion",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="DiagnosticoAtencion that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/DiagnosticoAtencion")
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
     *                  ref="#/definitions/DiagnosticoAtencion"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateDiagnosticoAtencionAPIRequest $request)
    {
        $input = $request->all();

        $diagnosticoAtencions = $this->diagnosticoAtencionRepository->create($input);

        return $this->sendResponse($diagnosticoAtencions->toArray(), 'Diagnostico Atencion saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/diagnosticoAtencions/{id}",
     *      summary="Display the specified DiagnosticoAtencion",
     *      tags={"DiagnosticoAtencion"},
     *      description="Get DiagnosticoAtencion",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of DiagnosticoAtencion",
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
     *                  ref="#/definitions/DiagnosticoAtencion"
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
        /** @var DiagnosticoAtencion $diagnosticoAtencion */
        $diagnosticoAtencion = $this->diagnosticoAtencionRepository->findWithoutFail($id);

        if (empty($diagnosticoAtencion)) {
            return $this->sendError('Diagnostico Atencion not found');
        }

        return $this->sendResponse($diagnosticoAtencion->toArray(), 'Diagnostico Atencion retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateDiagnosticoAtencionAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/diagnosticoAtencions/{id}",
     *      summary="Update the specified DiagnosticoAtencion in storage",
     *      tags={"DiagnosticoAtencion"},
     *      description="Update DiagnosticoAtencion",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of DiagnosticoAtencion",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="DiagnosticoAtencion that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/DiagnosticoAtencion")
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
     *                  ref="#/definitions/DiagnosticoAtencion"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateDiagnosticoAtencionAPIRequest $request)
    {
        $input = $request->all();

        /** @var DiagnosticoAtencion $diagnosticoAtencion */
        $diagnosticoAtencion = $this->diagnosticoAtencionRepository->findWithoutFail($id);

        if (empty($diagnosticoAtencion)) {
            return $this->sendError('Diagnostico Atencion not found');
        }

        $diagnosticoAtencion = $this->diagnosticoAtencionRepository->update($input, $id);

        return $this->sendResponse($diagnosticoAtencion->toArray(), 'DiagnosticoAtencion updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/diagnosticoAtencions/{id}",
     *      summary="Remove the specified DiagnosticoAtencion from storage",
     *      tags={"DiagnosticoAtencion"},
     *      description="Delete DiagnosticoAtencion",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of DiagnosticoAtencion",
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
        /** @var DiagnosticoAtencion $diagnosticoAtencion */
        $diagnosticoAtencion = $this->diagnosticoAtencionRepository->findWithoutFail($id);

        if (empty($diagnosticoAtencion)) {
            return $this->sendError('Diagnostico Atencion not found');
        }

        $diagnosticoAtencion->delete();

        return $this->sendResponse($id, 'Diagnostico Atencion deleted successfully');
    }
}
