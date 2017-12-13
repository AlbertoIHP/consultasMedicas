<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateExamenFisicoAPIRequest;
use App\Http\Requests\API\UpdateExamenFisicoAPIRequest;
use App\Models\ExamenFisico;
use App\Repositories\ExamenFisicoRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class ExamenFisicoController
 * @package App\Http\Controllers\API
 */

class ExamenFisicoAPIController extends AppBaseController
{
    /** @var  ExamenFisicoRepository */
    private $examenFisicoRepository;

    public function __construct(ExamenFisicoRepository $examenFisicoRepo)
    {
        $this->examenFisicoRepository = $examenFisicoRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/examenFisicos",
     *      summary="Get a listing of the ExamenFisicos.",
     *      tags={"ExamenFisico"},
     *      description="Get all ExamenFisicos",
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
     *                  @SWG\Items(ref="#/definitions/ExamenFisico")
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
        $this->examenFisicoRepository->pushCriteria(new RequestCriteria($request));
        $this->examenFisicoRepository->pushCriteria(new LimitOffsetCriteria($request));
        $examenFisicos = $this->examenFisicoRepository->all();

        return $this->sendResponse($examenFisicos->toArray(), 'Examen Fisicos retrieved successfully');
    }

    /**
     * @param CreateExamenFisicoAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/examenFisicos",
     *      summary="Store a newly created ExamenFisico in storage",
     *      tags={"ExamenFisico"},
     *      description="Store ExamenFisico",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="ExamenFisico that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/ExamenFisico")
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
     *                  ref="#/definitions/ExamenFisico"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateExamenFisicoAPIRequest $request)
    {
        $input = $request->all();

        $examenFisicos = $this->examenFisicoRepository->create($input);

        return $this->sendResponse($examenFisicos->toArray(), 'Examen Fisico saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/examenFisicos/{id}",
     *      summary="Display the specified ExamenFisico",
     *      tags={"ExamenFisico"},
     *      description="Get ExamenFisico",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of ExamenFisico",
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
     *                  ref="#/definitions/ExamenFisico"
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
        /** @var ExamenFisico $examenFisico */
        $examenFisico = $this->examenFisicoRepository->findWithoutFail($id);

        if (empty($examenFisico)) {
            return $this->sendError('Examen Fisico not found');
        }

        return $this->sendResponse($examenFisico->toArray(), 'Examen Fisico retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateExamenFisicoAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/examenFisicos/{id}",
     *      summary="Update the specified ExamenFisico in storage",
     *      tags={"ExamenFisico"},
     *      description="Update ExamenFisico",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of ExamenFisico",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="ExamenFisico that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/ExamenFisico")
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
     *                  ref="#/definitions/ExamenFisico"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateExamenFisicoAPIRequest $request)
    {
        $input = $request->all();

        /** @var ExamenFisico $examenFisico */
        $examenFisico = $this->examenFisicoRepository->findWithoutFail($id);

        if (empty($examenFisico)) {
            return $this->sendError('Examen Fisico not found');
        }

        $examenFisico = $this->examenFisicoRepository->update($input, $id);

        return $this->sendResponse($examenFisico->toArray(), 'ExamenFisico updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/examenFisicos/{id}",
     *      summary="Remove the specified ExamenFisico from storage",
     *      tags={"ExamenFisico"},
     *      description="Delete ExamenFisico",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of ExamenFisico",
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
        /** @var ExamenFisico $examenFisico */
        $examenFisico = $this->examenFisicoRepository->findWithoutFail($id);

        if (empty($examenFisico)) {
            return $this->sendError('Examen Fisico not found');
        }

        $examenFisico->delete();

        return $this->sendResponse($id, 'Examen Fisico deleted successfully');
    }
}
