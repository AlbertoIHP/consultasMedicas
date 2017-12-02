<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateViaAdministracionMedicamentoAPIRequest;
use App\Http\Requests\API\UpdateViaAdministracionMedicamentoAPIRequest;
use App\Models\ViaAdministracionMedicamento;
use App\Repositories\ViaAdministracionMedicamentoRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class ViaAdministracionMedicamentoController
 * @package App\Http\Controllers\API
 */

class ViaAdministracionMedicamentoAPIController extends AppBaseController
{
    /** @var  ViaAdministracionMedicamentoRepository */
    private $viaAdministracionMedicamentoRepository;

    public function __construct(ViaAdministracionMedicamentoRepository $viaAdministracionMedicamentoRepo)
    {
        $this->viaAdministracionMedicamentoRepository = $viaAdministracionMedicamentoRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/viaAdministracionMedicamentos",
     *      summary="Get a listing of the ViaAdministracionMedicamentos.",
     *      tags={"ViaAdministracionMedicamento"},
     *      description="Get all ViaAdministracionMedicamentos",
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
     *                  @SWG\Items(ref="#/definitions/ViaAdministracionMedicamento")
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
        $this->viaAdministracionMedicamentoRepository->pushCriteria(new RequestCriteria($request));
        $this->viaAdministracionMedicamentoRepository->pushCriteria(new LimitOffsetCriteria($request));
        $viaAdministracionMedicamentos = $this->viaAdministracionMedicamentoRepository->all();

        return $this->sendResponse($viaAdministracionMedicamentos->toArray(), 'Via Administracion Medicamentos retrieved successfully');
    }

    /**
     * @param CreateViaAdministracionMedicamentoAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/viaAdministracionMedicamentos",
     *      summary="Store a newly created ViaAdministracionMedicamento in storage",
     *      tags={"ViaAdministracionMedicamento"},
     *      description="Store ViaAdministracionMedicamento",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="ViaAdministracionMedicamento that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/ViaAdministracionMedicamento")
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
     *                  ref="#/definitions/ViaAdministracionMedicamento"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateViaAdministracionMedicamentoAPIRequest $request)
    {
        $input = $request->all();

        $viaAdministracionMedicamentos = $this->viaAdministracionMedicamentoRepository->create($input);

        return $this->sendResponse($viaAdministracionMedicamentos->toArray(), 'Via Administracion Medicamento saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/viaAdministracionMedicamentos/{id}",
     *      summary="Display the specified ViaAdministracionMedicamento",
     *      tags={"ViaAdministracionMedicamento"},
     *      description="Get ViaAdministracionMedicamento",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of ViaAdministracionMedicamento",
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
     *                  ref="#/definitions/ViaAdministracionMedicamento"
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
        /** @var ViaAdministracionMedicamento $viaAdministracionMedicamento */
        $viaAdministracionMedicamento = $this->viaAdministracionMedicamentoRepository->findWithoutFail($id);

        if (empty($viaAdministracionMedicamento)) {
            return $this->sendError('Via Administracion Medicamento not found');
        }

        return $this->sendResponse($viaAdministracionMedicamento->toArray(), 'Via Administracion Medicamento retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateViaAdministracionMedicamentoAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/viaAdministracionMedicamentos/{id}",
     *      summary="Update the specified ViaAdministracionMedicamento in storage",
     *      tags={"ViaAdministracionMedicamento"},
     *      description="Update ViaAdministracionMedicamento",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of ViaAdministracionMedicamento",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="ViaAdministracionMedicamento that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/ViaAdministracionMedicamento")
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
     *                  ref="#/definitions/ViaAdministracionMedicamento"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateViaAdministracionMedicamentoAPIRequest $request)
    {
        $input = $request->all();

        /** @var ViaAdministracionMedicamento $viaAdministracionMedicamento */
        $viaAdministracionMedicamento = $this->viaAdministracionMedicamentoRepository->findWithoutFail($id);

        if (empty($viaAdministracionMedicamento)) {
            return $this->sendError('Via Administracion Medicamento not found');
        }

        $viaAdministracionMedicamento = $this->viaAdministracionMedicamentoRepository->update($input, $id);

        return $this->sendResponse($viaAdministracionMedicamento->toArray(), 'ViaAdministracionMedicamento updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/viaAdministracionMedicamentos/{id}",
     *      summary="Remove the specified ViaAdministracionMedicamento from storage",
     *      tags={"ViaAdministracionMedicamento"},
     *      description="Delete ViaAdministracionMedicamento",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of ViaAdministracionMedicamento",
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
        /** @var ViaAdministracionMedicamento $viaAdministracionMedicamento */
        $viaAdministracionMedicamento = $this->viaAdministracionMedicamentoRepository->findWithoutFail($id);

        if (empty($viaAdministracionMedicamento)) {
            return $this->sendError('Via Administracion Medicamento not found');
        }

        $viaAdministracionMedicamento->delete();

        return $this->sendResponse($id, 'Via Administracion Medicamento deleted successfully');
    }
}
