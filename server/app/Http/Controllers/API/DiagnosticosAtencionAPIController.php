<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateDiagnosticosAtencionAPIRequest;
use App\Http\Requests\API\UpdateDiagnosticosAtencionAPIRequest;
use App\Models\DiagnosticosAtencion;
use App\Repositories\DiagnosticosAtencionRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class DiagnosticosAtencionController
 * @package App\Http\Controllers\API
 */

class DiagnosticosAtencionAPIController extends AppBaseController
{
    /** @var  DiagnosticosAtencionRepository */
    private $diagnosticosAtencionRepository;

    public function __construct(DiagnosticosAtencionRepository $diagnosticosAtencionRepo)
    {
        $this->diagnosticosAtencionRepository = $diagnosticosAtencionRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/diagnosticosAtencions",
     *      summary="Get a listing of the DiagnosticosAtencions.",
     *      tags={"DiagnosticosAtencion"},
     *      description="Get all DiagnosticosAtencions",
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
     *                  @SWG\Items(ref="#/definitions/DiagnosticosAtencion")
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
        $this->diagnosticosAtencionRepository->pushCriteria(new RequestCriteria($request));
        $this->diagnosticosAtencionRepository->pushCriteria(new LimitOffsetCriteria($request));
        $diagnosticosAtencions = $this->diagnosticosAtencionRepository->all();

        return $this->sendResponse($diagnosticosAtencions->toArray(), 'Diagnosticos Atencions retrieved successfully');
    }

    /**
     * @param CreateDiagnosticosAtencionAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/diagnosticosAtencions",
     *      summary="Store a newly created DiagnosticosAtencion in storage",
     *      tags={"DiagnosticosAtencion"},
     *      description="Store DiagnosticosAtencion",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="DiagnosticosAtencion that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/DiagnosticosAtencion")
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
     *                  ref="#/definitions/DiagnosticosAtencion"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateDiagnosticosAtencionAPIRequest $request)
    {
        $input = $request->all();

        $diagnosticosAtencions = $this->diagnosticosAtencionRepository->create($input);

        return $this->sendResponse($diagnosticosAtencions->toArray(), 'Diagnosticos Atencion saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/diagnosticosAtencions/{id}",
     *      summary="Display the specified DiagnosticosAtencion",
     *      tags={"DiagnosticosAtencion"},
     *      description="Get DiagnosticosAtencion",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of DiagnosticosAtencion",
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
     *                  ref="#/definitions/DiagnosticosAtencion"
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
        /** @var DiagnosticosAtencion $diagnosticosAtencion */
        $diagnosticosAtencion = $this->diagnosticosAtencionRepository->findWithoutFail($id);

        if (empty($diagnosticosAtencion)) {
            return $this->sendError('Diagnosticos Atencion not found');
        }

        return $this->sendResponse($diagnosticosAtencion->toArray(), 'Diagnosticos Atencion retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateDiagnosticosAtencionAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/diagnosticosAtencions/{id}",
     *      summary="Update the specified DiagnosticosAtencion in storage",
     *      tags={"DiagnosticosAtencion"},
     *      description="Update DiagnosticosAtencion",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of DiagnosticosAtencion",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="DiagnosticosAtencion that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/DiagnosticosAtencion")
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
     *                  ref="#/definitions/DiagnosticosAtencion"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateDiagnosticosAtencionAPIRequest $request)
    {
        $input = $request->all();

        /** @var DiagnosticosAtencion $diagnosticosAtencion */
        $diagnosticosAtencion = $this->diagnosticosAtencionRepository->findWithoutFail($id);

        if (empty($diagnosticosAtencion)) {
            return $this->sendError('Diagnosticos Atencion not found');
        }

        $diagnosticosAtencion = $this->diagnosticosAtencionRepository->update($input, $id);

        return $this->sendResponse($diagnosticosAtencion->toArray(), 'DiagnosticosAtencion updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/diagnosticosAtencions/{id}",
     *      summary="Remove the specified DiagnosticosAtencion from storage",
     *      tags={"DiagnosticosAtencion"},
     *      description="Delete DiagnosticosAtencion",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of DiagnosticosAtencion",
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
        /** @var DiagnosticosAtencion $diagnosticosAtencion */
        $diagnosticosAtencion = $this->diagnosticosAtencionRepository->findWithoutFail($id);

        if (empty($diagnosticosAtencion)) {
            return $this->sendError('Diagnosticos Atencion not found');
        }

        $diagnosticosAtencion->delete();

        return $this->sendResponse($id, 'Diagnosticos Atencion deleted successfully');
    }
}
