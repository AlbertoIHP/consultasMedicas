<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateRecetaMedicamentoAPIRequest;
use App\Http\Requests\API\UpdateRecetaMedicamentoAPIRequest;
use App\Models\RecetaMedicamento;
use App\Repositories\RecetaMedicamentoRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class RecetaMedicamentoController
 * @package App\Http\Controllers\API
 */

class RecetaMedicamentoAPIController extends AppBaseController
{
    /** @var  RecetaMedicamentoRepository */
    private $recetaMedicamentoRepository;

    public function __construct(RecetaMedicamentoRepository $recetaMedicamentoRepo)
    {
        $this->recetaMedicamentoRepository = $recetaMedicamentoRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/recetaMedicamentos",
     *      summary="Get a listing of the RecetaMedicamentos.",
     *      tags={"RecetaMedicamento"},
     *      description="Get all RecetaMedicamentos",
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
     *                  @SWG\Items(ref="#/definitions/RecetaMedicamento")
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
        $this->recetaMedicamentoRepository->pushCriteria(new RequestCriteria($request));
        $this->recetaMedicamentoRepository->pushCriteria(new LimitOffsetCriteria($request));
        $recetaMedicamentos = $this->recetaMedicamentoRepository->all();

        return $this->sendResponse($recetaMedicamentos->toArray(), 'Receta Medicamentos retrieved successfully');
    }

    /**
     * @param CreateRecetaMedicamentoAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/recetaMedicamentos",
     *      summary="Store a newly created RecetaMedicamento in storage",
     *      tags={"RecetaMedicamento"},
     *      description="Store RecetaMedicamento",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="RecetaMedicamento that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/RecetaMedicamento")
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
     *                  ref="#/definitions/RecetaMedicamento"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateRecetaMedicamentoAPIRequest $request)
    {
        $input = $request->all();

        $recetaMedicamentos = $this->recetaMedicamentoRepository->create($input);

        return $this->sendResponse($recetaMedicamentos->toArray(), 'Receta Medicamento saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/recetaMedicamentos/{id}",
     *      summary="Display the specified RecetaMedicamento",
     *      tags={"RecetaMedicamento"},
     *      description="Get RecetaMedicamento",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of RecetaMedicamento",
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
     *                  ref="#/definitions/RecetaMedicamento"
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
        /** @var RecetaMedicamento $recetaMedicamento */
        $recetaMedicamento = $this->recetaMedicamentoRepository->findWithoutFail($id);

        if (empty($recetaMedicamento)) {
            return $this->sendError('Receta Medicamento not found');
        }

        return $this->sendResponse($recetaMedicamento->toArray(), 'Receta Medicamento retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateRecetaMedicamentoAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/recetaMedicamentos/{id}",
     *      summary="Update the specified RecetaMedicamento in storage",
     *      tags={"RecetaMedicamento"},
     *      description="Update RecetaMedicamento",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of RecetaMedicamento",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="RecetaMedicamento that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/RecetaMedicamento")
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
     *                  ref="#/definitions/RecetaMedicamento"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateRecetaMedicamentoAPIRequest $request)
    {
        $input = $request->all();

        /** @var RecetaMedicamento $recetaMedicamento */
        $recetaMedicamento = $this->recetaMedicamentoRepository->findWithoutFail($id);

        if (empty($recetaMedicamento)) {
            return $this->sendError('Receta Medicamento not found');
        }

        $recetaMedicamento = $this->recetaMedicamentoRepository->update($input, $id);

        return $this->sendResponse($recetaMedicamento->toArray(), 'RecetaMedicamento updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/recetaMedicamentos/{id}",
     *      summary="Remove the specified RecetaMedicamento from storage",
     *      tags={"RecetaMedicamento"},
     *      description="Delete RecetaMedicamento",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of RecetaMedicamento",
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
        /** @var RecetaMedicamento $recetaMedicamento */
        $recetaMedicamento = $this->recetaMedicamentoRepository->findWithoutFail($id);

        if (empty($recetaMedicamento)) {
            return $this->sendError('Receta Medicamento not found');
        }

        $recetaMedicamento->delete();

        return $this->sendResponse($id, 'Receta Medicamento deleted successfully');
    }
}
