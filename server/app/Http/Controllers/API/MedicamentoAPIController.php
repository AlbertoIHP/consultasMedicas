<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateMedicamentoAPIRequest;
use App\Http\Requests\API\UpdateMedicamentoAPIRequest;
use App\Models\Medicamento;
use App\Repositories\MedicamentoRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class MedicamentoController
 * @package App\Http\Controllers\API
 */

class MedicamentoAPIController extends AppBaseController
{
    /** @var  MedicamentoRepository */
    private $medicamentoRepository;

    public function __construct(MedicamentoRepository $medicamentoRepo)
    {
        $this->medicamentoRepository = $medicamentoRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/medicamentos",
     *      summary="Get a listing of the Medicamentos.",
     *      tags={"Medicamento"},
     *      description="Get all Medicamentos",
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
     *                  @SWG\Items(ref="#/definitions/Medicamento")
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
        $this->medicamentoRepository->pushCriteria(new RequestCriteria($request));
        $this->medicamentoRepository->pushCriteria(new LimitOffsetCriteria($request));
        $medicamentos = $this->medicamentoRepository->all();

        return $this->sendResponse($medicamentos->toArray(), 'Medicamentos retrieved successfully');
    }

    /**
     * @param CreateMedicamentoAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/medicamentos",
     *      summary="Store a newly created Medicamento in storage",
     *      tags={"Medicamento"},
     *      description="Store Medicamento",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Medicamento that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Medicamento")
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
     *                  ref="#/definitions/Medicamento"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateMedicamentoAPIRequest $request)
    {
        $input = $request->all();

        $medicamentos = $this->medicamentoRepository->create($input);

        return $this->sendResponse($medicamentos->toArray(), 'Medicamento saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/medicamentos/{id}",
     *      summary="Display the specified Medicamento",
     *      tags={"Medicamento"},
     *      description="Get Medicamento",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Medicamento",
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
     *                  ref="#/definitions/Medicamento"
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
        /** @var Medicamento $medicamento */
        $medicamento = $this->medicamentoRepository->findWithoutFail($id);

        if (empty($medicamento)) {
            return $this->sendError('Medicamento not found');
        }

        return $this->sendResponse($medicamento->toArray(), 'Medicamento retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateMedicamentoAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/medicamentos/{id}",
     *      summary="Update the specified Medicamento in storage",
     *      tags={"Medicamento"},
     *      description="Update Medicamento",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Medicamento",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Medicamento that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Medicamento")
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
     *                  ref="#/definitions/Medicamento"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateMedicamentoAPIRequest $request)
    {
        $input = $request->all();

        /** @var Medicamento $medicamento */
        $medicamento = $this->medicamentoRepository->findWithoutFail($id);

        if (empty($medicamento)) {
            return $this->sendError('Medicamento not found');
        }

        $medicamento = $this->medicamentoRepository->update($input, $id);

        return $this->sendResponse($medicamento->toArray(), 'Medicamento updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/medicamentos/{id}",
     *      summary="Remove the specified Medicamento from storage",
     *      tags={"Medicamento"},
     *      description="Delete Medicamento",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Medicamento",
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
        /** @var Medicamento $medicamento */
        $medicamento = $this->medicamentoRepository->findWithoutFail($id);

        if (empty($medicamento)) {
            return $this->sendError('Medicamento not found');
        }

        $medicamento->delete();

        return $this->sendResponse($id, 'Medicamento deleted successfully');
    }
}
