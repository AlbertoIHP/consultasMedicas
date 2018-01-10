<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateGrupoEtareoAPIRequest;
use App\Http\Requests\API\UpdateGrupoEtareoAPIRequest;
use App\Models\GrupoEtareo;
use App\Repositories\GrupoEtareoRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class GrupoEtareoController
 * @package App\Http\Controllers\API
 */

class GrupoEtareoAPIController extends AppBaseController
{
    /** @var  GrupoEtareoRepository */
    private $grupoEtareoRepository;

    public function __construct(GrupoEtareoRepository $grupoEtareoRepo)
    {
        $this->grupoEtareoRepository = $grupoEtareoRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/grupoEtareos",
     *      summary="Get a listing of the GrupoEtareos.",
     *      tags={"GrupoEtareo"},
     *      description="Get all GrupoEtareos",
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
     *                  @SWG\Items(ref="#/definitions/GrupoEtareo")
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
        $this->grupoEtareoRepository->pushCriteria(new RequestCriteria($request));
        $this->grupoEtareoRepository->pushCriteria(new LimitOffsetCriteria($request));
        $grupoEtareos = $this->grupoEtareoRepository->all();

        return $this->sendResponse($grupoEtareos->toArray(), 'Grupo Etareos retrieved successfully');
    }

    /**
     * @param CreateGrupoEtareoAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/grupoEtareos",
     *      summary="Store a newly created GrupoEtareo in storage",
     *      tags={"GrupoEtareo"},
     *      description="Store GrupoEtareo",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="GrupoEtareo that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/GrupoEtareo")
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
     *                  ref="#/definitions/GrupoEtareo"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateGrupoEtareoAPIRequest $request)
    {
        $input = $request->all();

        $grupoEtareos = $this->grupoEtareoRepository->create($input);

        return $this->sendResponse($grupoEtareos->toArray(), 'Grupo Etareo saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/grupoEtareos/{id}",
     *      summary="Display the specified GrupoEtareo",
     *      tags={"GrupoEtareo"},
     *      description="Get GrupoEtareo",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of GrupoEtareo",
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
     *                  ref="#/definitions/GrupoEtareo"
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
        /** @var GrupoEtareo $grupoEtareo */
        $grupoEtareo = $this->grupoEtareoRepository->findWithoutFail($id);

        if (empty($grupoEtareo)) {
            return $this->sendError('Grupo Etareo not found');
        }

        return $this->sendResponse($grupoEtareo->toArray(), 'Grupo Etareo retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateGrupoEtareoAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/grupoEtareos/{id}",
     *      summary="Update the specified GrupoEtareo in storage",
     *      tags={"GrupoEtareo"},
     *      description="Update GrupoEtareo",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of GrupoEtareo",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="GrupoEtareo that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/GrupoEtareo")
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
     *                  ref="#/definitions/GrupoEtareo"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateGrupoEtareoAPIRequest $request)
    {
        $input = $request->all();

        /** @var GrupoEtareo $grupoEtareo */
        $grupoEtareo = $this->grupoEtareoRepository->findWithoutFail($id);

        if (empty($grupoEtareo)) {
            return $this->sendError('Grupo Etareo not found');
        }

        $grupoEtareo = $this->grupoEtareoRepository->update($input, $id);

        return $this->sendResponse($grupoEtareo->toArray(), 'GrupoEtareo updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/grupoEtareos/{id}",
     *      summary="Remove the specified GrupoEtareo from storage",
     *      tags={"GrupoEtareo"},
     *      description="Delete GrupoEtareo",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of GrupoEtareo",
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
        /** @var GrupoEtareo $grupoEtareo */
        $grupoEtareo = $this->grupoEtareoRepository->findWithoutFail($id);

        if (empty($grupoEtareo)) {
            return $this->sendError('Grupo Etareo not found');
        }

        $grupoEtareo->delete();

        return $this->sendResponse($id, 'Grupo Etareo deleted successfully');
    }
}
