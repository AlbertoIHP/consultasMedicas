<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateDiagnosticoAPIRequest;
use App\Http\Requests\API\UpdateDiagnosticoAPIRequest;
use App\Models\Diagnostico;
use App\Repositories\DiagnosticoRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class DiagnosticoController
 * @package App\Http\Controllers\API
 */

class DiagnosticoAPIController extends AppBaseController
{
    /** @var  DiagnosticoRepository */
    private $diagnosticoRepository;

    public function __construct(DiagnosticoRepository $diagnosticoRepo)
    {
        $this->diagnosticoRepository = $diagnosticoRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/diagnosticos",
     *      summary="Get a listing of the Diagnosticos.",
     *      tags={"Diagnostico"},
     *      description="Get all Diagnosticos",
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
     *                  @SWG\Items(ref="#/definitions/Diagnostico")
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
        $this->diagnosticoRepository->pushCriteria(new RequestCriteria($request));
        $this->diagnosticoRepository->pushCriteria(new LimitOffsetCriteria($request));
        $diagnosticos = $this->diagnosticoRepository->all();

        return $this->sendResponse($diagnosticos->toArray(), 'Diagnosticos retrieved successfully');
    }

    /**
     * @param CreateDiagnosticoAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/diagnosticos",
     *      summary="Store a newly created Diagnostico in storage",
     *      tags={"Diagnostico"},
     *      description="Store Diagnostico",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Diagnostico that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Diagnostico")
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
     *                  ref="#/definitions/Diagnostico"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateDiagnosticoAPIRequest $request)
    {
        $input = $request->all();

        $diagnosticos = $this->diagnosticoRepository->create($input);

        return $this->sendResponse($diagnosticos->toArray(), 'Diagnostico saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/diagnosticos/{id}",
     *      summary="Display the specified Diagnostico",
     *      tags={"Diagnostico"},
     *      description="Get Diagnostico",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Diagnostico",
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
     *                  ref="#/definitions/Diagnostico"
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
        /** @var Diagnostico $diagnostico */
        $diagnostico = $this->diagnosticoRepository->findWithoutFail($id);

        if (empty($diagnostico)) {
            return $this->sendError('Diagnostico not found');
        }

        return $this->sendResponse($diagnostico->toArray(), 'Diagnostico retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateDiagnosticoAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/diagnosticos/{id}",
     *      summary="Update the specified Diagnostico in storage",
     *      tags={"Diagnostico"},
     *      description="Update Diagnostico",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Diagnostico",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Diagnostico that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Diagnostico")
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
     *                  ref="#/definitions/Diagnostico"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateDiagnosticoAPIRequest $request)
    {
        $input = $request->all();

        /** @var Diagnostico $diagnostico */
        $diagnostico = $this->diagnosticoRepository->findWithoutFail($id);

        if (empty($diagnostico)) {
            return $this->sendError('Diagnostico not found');
        }

        $diagnostico = $this->diagnosticoRepository->update($input, $id);

        return $this->sendResponse($diagnostico->toArray(), 'Diagnostico updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/diagnosticos/{id}",
     *      summary="Remove the specified Diagnostico from storage",
     *      tags={"Diagnostico"},
     *      description="Delete Diagnostico",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Diagnostico",
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
        /** @var Diagnostico $diagnostico */
        $diagnostico = $this->diagnosticoRepository->findWithoutFail($id);

        if (empty($diagnostico)) {
            return $this->sendError('Diagnostico not found');
        }

        $diagnostico->delete();

        return $this->sendResponse($id, 'Diagnostico deleted successfully');
    }
}
