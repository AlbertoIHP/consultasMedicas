<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateGrupoEtareoVacunaAPIRequest;
use App\Http\Requests\API\UpdateGrupoEtareoVacunaAPIRequest;
use App\Models\GrupoEtareoVacuna;
use App\Repositories\GrupoEtareoVacunaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class GrupoEtareoVacunaController
 * @package App\Http\Controllers\API
 */

class GrupoEtareoVacunaAPIController extends AppBaseController
{
    /** @var  GrupoEtareoVacunaRepository */
    private $grupoEtareoVacunaRepository;

    public function __construct(GrupoEtareoVacunaRepository $grupoEtareoVacunaRepo)
    {
        $this->grupoEtareoVacunaRepository = $grupoEtareoVacunaRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/grupoEtareoVacunas",
     *      summary="Get a listing of the GrupoEtareoVacunas.",
     *      tags={"GrupoEtareoVacuna"},
     *      description="Get all GrupoEtareoVacunas",
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
     *                  @SWG\Items(ref="#/definitions/GrupoEtareoVacuna")
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
        $this->grupoEtareoVacunaRepository->pushCriteria(new RequestCriteria($request));
        $this->grupoEtareoVacunaRepository->pushCriteria(new LimitOffsetCriteria($request));
        $grupoEtareoVacunas = $this->grupoEtareoVacunaRepository->all();

        return $this->sendResponse($grupoEtareoVacunas->toArray(), 'Grupo Etareo Vacunas retrieved successfully');
    }

    /**
     * @param CreateGrupoEtareoVacunaAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/grupoEtareoVacunas",
     *      summary="Store a newly created GrupoEtareoVacuna in storage",
     *      tags={"GrupoEtareoVacuna"},
     *      description="Store GrupoEtareoVacuna",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="GrupoEtareoVacuna that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/GrupoEtareoVacuna")
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
     *                  ref="#/definitions/GrupoEtareoVacuna"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateGrupoEtareoVacunaAPIRequest $request)
    {
        $input = $request->all();

        $grupoEtareoVacunas = $this->grupoEtareoVacunaRepository->create($input);

        return $this->sendResponse($grupoEtareoVacunas->toArray(), 'Grupo Etareo Vacuna saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/grupoEtareoVacunas/{id}",
     *      summary="Display the specified GrupoEtareoVacuna",
     *      tags={"GrupoEtareoVacuna"},
     *      description="Get GrupoEtareoVacuna",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of GrupoEtareoVacuna",
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
     *                  ref="#/definitions/GrupoEtareoVacuna"
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
        /** @var GrupoEtareoVacuna $grupoEtareoVacuna */
        $grupoEtareoVacuna = $this->grupoEtareoVacunaRepository->findWithoutFail($id);

        if (empty($grupoEtareoVacuna)) {
            return $this->sendError('Grupo Etareo Vacuna not found');
        }

        return $this->sendResponse($grupoEtareoVacuna->toArray(), 'Grupo Etareo Vacuna retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateGrupoEtareoVacunaAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/grupoEtareoVacunas/{id}",
     *      summary="Update the specified GrupoEtareoVacuna in storage",
     *      tags={"GrupoEtareoVacuna"},
     *      description="Update GrupoEtareoVacuna",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of GrupoEtareoVacuna",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="GrupoEtareoVacuna that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/GrupoEtareoVacuna")
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
     *                  ref="#/definitions/GrupoEtareoVacuna"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateGrupoEtareoVacunaAPIRequest $request)
    {
        $input = $request->all();

        /** @var GrupoEtareoVacuna $grupoEtareoVacuna */
        $grupoEtareoVacuna = $this->grupoEtareoVacunaRepository->findWithoutFail($id);

        if (empty($grupoEtareoVacuna)) {
            return $this->sendError('Grupo Etareo Vacuna not found');
        }

        $grupoEtareoVacuna = $this->grupoEtareoVacunaRepository->update($input, $id);

        return $this->sendResponse($grupoEtareoVacuna->toArray(), 'GrupoEtareoVacuna updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/grupoEtareoVacunas/{id}",
     *      summary="Remove the specified GrupoEtareoVacuna from storage",
     *      tags={"GrupoEtareoVacuna"},
     *      description="Delete GrupoEtareoVacuna",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of GrupoEtareoVacuna",
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
        /** @var GrupoEtareoVacuna $grupoEtareoVacuna */
        $grupoEtareoVacuna = $this->grupoEtareoVacunaRepository->findWithoutFail($id);

        if (empty($grupoEtareoVacuna)) {
            return $this->sendError('Grupo Etareo Vacuna not found');
        }

        $grupoEtareoVacuna->delete();

        return $this->sendResponse($id, 'Grupo Etareo Vacuna deleted successfully');
    }
}
