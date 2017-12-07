<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateGrupoEtnicoAPIRequest;
use App\Http\Requests\API\UpdateGrupoEtnicoAPIRequest;
use App\Models\GrupoEtnico;
use App\Repositories\GrupoEtnicoRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class GrupoEtnicoController
 * @package App\Http\Controllers\API
 */

class GrupoEtnicoAPIController extends AppBaseController
{
    /** @var  GrupoEtnicoRepository */
    private $grupoEtnicoRepository;

    public function __construct(GrupoEtnicoRepository $grupoEtnicoRepo)
    {
        $this->grupoEtnicoRepository = $grupoEtnicoRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/grupoEtnicos",
     *      summary="Get a listing of the GrupoEtnicos.",
     *      tags={"GrupoEtnico"},
     *      description="Get all GrupoEtnicos",
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
     *                  @SWG\Items(ref="#/definitions/GrupoEtnico")
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
        $this->grupoEtnicoRepository->pushCriteria(new RequestCriteria($request));
        $this->grupoEtnicoRepository->pushCriteria(new LimitOffsetCriteria($request));
        $grupoEtnicos = $this->grupoEtnicoRepository->all();

        return $this->sendResponse($grupoEtnicos->toArray(), 'Grupo Etnicos retrieved successfully');
    }

    /**
     * @param CreateGrupoEtnicoAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/grupoEtnicos",
     *      summary="Store a newly created GrupoEtnico in storage",
     *      tags={"GrupoEtnico"},
     *      description="Store GrupoEtnico",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="GrupoEtnico that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/GrupoEtnico")
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
     *                  ref="#/definitions/GrupoEtnico"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateGrupoEtnicoAPIRequest $request)
    {
        $input = $request->all();

        $grupoEtnicos = $this->grupoEtnicoRepository->create($input);

        return $this->sendResponse($grupoEtnicos->toArray(), 'Grupo Etnico saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/grupoEtnicos/{id}",
     *      summary="Display the specified GrupoEtnico",
     *      tags={"GrupoEtnico"},
     *      description="Get GrupoEtnico",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of GrupoEtnico",
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
     *                  ref="#/definitions/GrupoEtnico"
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
        /** @var GrupoEtnico $grupoEtnico */
        $grupoEtnico = $this->grupoEtnicoRepository->findWithoutFail($id);

        if (empty($grupoEtnico)) {
            return $this->sendError('Grupo Etnico not found');
        }

        return $this->sendResponse($grupoEtnico->toArray(), 'Grupo Etnico retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateGrupoEtnicoAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/grupoEtnicos/{id}",
     *      summary="Update the specified GrupoEtnico in storage",
     *      tags={"GrupoEtnico"},
     *      description="Update GrupoEtnico",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of GrupoEtnico",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="GrupoEtnico that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/GrupoEtnico")
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
     *                  ref="#/definitions/GrupoEtnico"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateGrupoEtnicoAPIRequest $request)
    {
        $input = $request->all();

        /** @var GrupoEtnico $grupoEtnico */
        $grupoEtnico = $this->grupoEtnicoRepository->findWithoutFail($id);

        if (empty($grupoEtnico)) {
            return $this->sendError('Grupo Etnico not found');
        }

        $grupoEtnico = $this->grupoEtnicoRepository->update($input, $id);

        return $this->sendResponse($grupoEtnico->toArray(), 'GrupoEtnico updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/grupoEtnicos/{id}",
     *      summary="Remove the specified GrupoEtnico from storage",
     *      tags={"GrupoEtnico"},
     *      description="Delete GrupoEtnico",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of GrupoEtnico",
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
        /** @var GrupoEtnico $grupoEtnico */
        $grupoEtnico = $this->grupoEtnicoRepository->findWithoutFail($id);

        if (empty($grupoEtnico)) {
            return $this->sendError('Grupo Etnico not found');
        }

        $grupoEtnico->delete();

        return $this->sendResponse($id, 'Grupo Etnico deleted successfully');
    }
}
