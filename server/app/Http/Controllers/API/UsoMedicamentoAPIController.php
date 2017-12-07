<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateUsoMedicamentoAPIRequest;
use App\Http\Requests\API\UpdateUsoMedicamentoAPIRequest;
use App\Models\UsoMedicamento;
use App\Repositories\UsoMedicamentoRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class UsoMedicamentoController
 * @package App\Http\Controllers\API
 */

class UsoMedicamentoAPIController extends AppBaseController
{
    /** @var  UsoMedicamentoRepository */
    private $usoMedicamentoRepository;

    public function __construct(UsoMedicamentoRepository $usoMedicamentoRepo)
    {
        $this->usoMedicamentoRepository = $usoMedicamentoRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/usoMedicamentos",
     *      summary="Get a listing of the UsoMedicamentos.",
     *      tags={"UsoMedicamento"},
     *      description="Get all UsoMedicamentos",
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
     *                  @SWG\Items(ref="#/definitions/UsoMedicamento")
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
        $this->usoMedicamentoRepository->pushCriteria(new RequestCriteria($request));
        $this->usoMedicamentoRepository->pushCriteria(new LimitOffsetCriteria($request));
        $usoMedicamentos = $this->usoMedicamentoRepository->all();

        return $this->sendResponse($usoMedicamentos->toArray(), 'Uso Medicamentos retrieved successfully');
    }

    /**
     * @param CreateUsoMedicamentoAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/usoMedicamentos",
     *      summary="Store a newly created UsoMedicamento in storage",
     *      tags={"UsoMedicamento"},
     *      description="Store UsoMedicamento",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="UsoMedicamento that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/UsoMedicamento")
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
     *                  ref="#/definitions/UsoMedicamento"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateUsoMedicamentoAPIRequest $request)
    {
        $input = $request->all();

        $usoMedicamentos = $this->usoMedicamentoRepository->create($input);

        return $this->sendResponse($usoMedicamentos->toArray(), 'Uso Medicamento saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/usoMedicamentos/{id}",
     *      summary="Display the specified UsoMedicamento",
     *      tags={"UsoMedicamento"},
     *      description="Get UsoMedicamento",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of UsoMedicamento",
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
     *                  ref="#/definitions/UsoMedicamento"
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
        /** @var UsoMedicamento $usoMedicamento */
        $usoMedicamento = $this->usoMedicamentoRepository->findWithoutFail($id);

        if (empty($usoMedicamento)) {
            return $this->sendError('Uso Medicamento not found');
        }

        return $this->sendResponse($usoMedicamento->toArray(), 'Uso Medicamento retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateUsoMedicamentoAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/usoMedicamentos/{id}",
     *      summary="Update the specified UsoMedicamento in storage",
     *      tags={"UsoMedicamento"},
     *      description="Update UsoMedicamento",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of UsoMedicamento",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="UsoMedicamento that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/UsoMedicamento")
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
     *                  ref="#/definitions/UsoMedicamento"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateUsoMedicamentoAPIRequest $request)
    {
        $input = $request->all();

        /** @var UsoMedicamento $usoMedicamento */
        $usoMedicamento = $this->usoMedicamentoRepository->findWithoutFail($id);

        if (empty($usoMedicamento)) {
            return $this->sendError('Uso Medicamento not found');
        }

        $usoMedicamento = $this->usoMedicamentoRepository->update($input, $id);

        return $this->sendResponse($usoMedicamento->toArray(), 'UsoMedicamento updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/usoMedicamentos/{id}",
     *      summary="Remove the specified UsoMedicamento from storage",
     *      tags={"UsoMedicamento"},
     *      description="Delete UsoMedicamento",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of UsoMedicamento",
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
        /** @var UsoMedicamento $usoMedicamento */
        $usoMedicamento = $this->usoMedicamentoRepository->findWithoutFail($id);

        if (empty($usoMedicamento)) {
            return $this->sendError('Uso Medicamento not found');
        }

        $usoMedicamento->delete();

        return $this->sendResponse($id, 'Uso Medicamento deleted successfully');
    }
}
