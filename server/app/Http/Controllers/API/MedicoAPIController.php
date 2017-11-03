<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateMedicoAPIRequest;
use App\Http\Requests\API\UpdateMedicoAPIRequest;
use App\Models\Medico;
use App\Repositories\MedicoRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class MedicoController
 * @package App\Http\Controllers\API
 */

class MedicoAPIController extends AppBaseController
{
    /** @var  MedicoRepository */
    private $medicoRepository;

    public function __construct(MedicoRepository $medicoRepo)
    {
        $this->medicoRepository = $medicoRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/medicos",
     *      summary="Get a listing of the Medicos.",
     *      tags={"Medico"},
     *      description="Get all Medicos",
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
     *                  @SWG\Items(ref="#/definitions/Medico")
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
        $this->medicoRepository->pushCriteria(new RequestCriteria($request));
        $this->medicoRepository->pushCriteria(new LimitOffsetCriteria($request));
        $medicos = $this->medicoRepository->all();

        return $this->sendResponse($medicos->toArray(), 'Medicos retrieved successfully');
    }

    /**
     * @param CreateMedicoAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/medicos",
     *      summary="Store a newly created Medico in storage",
     *      tags={"Medico"},
     *      description="Store Medico",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Medico that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Medico")
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
     *                  ref="#/definitions/Medico"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateMedicoAPIRequest $request)
    {
        $input = $request->all();

        $medicos = $this->medicoRepository->create($input);

        return $this->sendResponse($medicos->toArray(), 'Medico saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/medicos/{id}",
     *      summary="Display the specified Medico",
     *      tags={"Medico"},
     *      description="Get Medico",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Medico",
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
     *                  ref="#/definitions/Medico"
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
        /** @var Medico $medico */
        $medico = $this->medicoRepository->findWithoutFail($id);

        if (empty($medico)) {
            return $this->sendError('Medico not found');
        }

        return $this->sendResponse($medico->toArray(), 'Medico retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateMedicoAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/medicos/{id}",
     *      summary="Update the specified Medico in storage",
     *      tags={"Medico"},
     *      description="Update Medico",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Medico",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Medico that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Medico")
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
     *                  ref="#/definitions/Medico"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateMedicoAPIRequest $request)
    {
        $input = $request->all();

        /** @var Medico $medico */
        $medico = $this->medicoRepository->findWithoutFail($id);

        if (empty($medico)) {
            return $this->sendError('Medico not found');
        }

        $medico = $this->medicoRepository->update($input, $id);

        return $this->sendResponse($medico->toArray(), 'Medico updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/medicos/{id}",
     *      summary="Remove the specified Medico from storage",
     *      tags={"Medico"},
     *      description="Delete Medico",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Medico",
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
        /** @var Medico $medico */
        $medico = $this->medicoRepository->findWithoutFail($id);

        if (empty($medico)) {
            return $this->sendError('Medico not found');
        }

        $medico->delete();

        return $this->sendResponse($id, 'Medico deleted successfully');
    }
}
