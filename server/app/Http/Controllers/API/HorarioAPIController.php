<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateHorarioAPIRequest;
use App\Http\Requests\API\UpdateHorarioAPIRequest;
use App\Models\Horario;
use App\Repositories\HorarioRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class HorarioController
 * @package App\Http\Controllers\API
 */

class HorarioAPIController extends AppBaseController
{
    /** @var  HorarioRepository */
    private $horarioRepository;

    public function __construct(HorarioRepository $horarioRepo)
    {
        $this->horarioRepository = $horarioRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/horarios",
     *      summary="Get a listing of the Horarios.",
     *      tags={"Horario"},
     *      description="Get all Horarios",
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
     *                  @SWG\Items(ref="#/definitions/Horario")
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
        $this->horarioRepository->pushCriteria(new RequestCriteria($request));
        $this->horarioRepository->pushCriteria(new LimitOffsetCriteria($request));
        $horarios = $this->horarioRepository->all();

        return $this->sendResponse($horarios->toArray(), 'Horarios retrieved successfully');
    }

    /**
     * @param CreateHorarioAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/horarios",
     *      summary="Store a newly created Horario in storage",
     *      tags={"Horario"},
     *      description="Store Horario",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Horario that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Horario")
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
     *                  ref="#/definitions/Horario"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateHorarioAPIRequest $request)
    {
        $input = $request->all();

        $horarios = $this->horarioRepository->create($input);

        return $this->sendResponse($horarios->toArray(), 'Horario saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/horarios/{id}",
     *      summary="Display the specified Horario",
     *      tags={"Horario"},
     *      description="Get Horario",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Horario",
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
     *                  ref="#/definitions/Horario"
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
        /** @var Horario $horario */
        $horario = $this->horarioRepository->findWithoutFail($id);

        if (empty($horario)) {
            return $this->sendError('Horario not found');
        }

        return $this->sendResponse($horario->toArray(), 'Horario retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateHorarioAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/horarios/{id}",
     *      summary="Update the specified Horario in storage",
     *      tags={"Horario"},
     *      description="Update Horario",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Horario",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Horario that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Horario")
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
     *                  ref="#/definitions/Horario"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateHorarioAPIRequest $request)
    {
        $input = $request->all();

        /** @var Horario $horario */
        $horario = $this->horarioRepository->findWithoutFail($id);

        if (empty($horario)) {
            return $this->sendError('Horario not found');
        }

        $horario = $this->horarioRepository->update($input, $id);

        return $this->sendResponse($horario->toArray(), 'Horario updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/horarios/{id}",
     *      summary="Remove the specified Horario from storage",
     *      tags={"Horario"},
     *      description="Delete Horario",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Horario",
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
        /** @var Horario $horario */
        $horario = $this->horarioRepository->findWithoutFail($id);

        if (empty($horario)) {
            return $this->sendError('Horario not found');
        }

        $horario->delete();

        return $this->sendResponse($id, 'Horario deleted successfully');
    }
}
