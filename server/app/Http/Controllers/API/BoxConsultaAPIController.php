<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateBoxConsultaAPIRequest;
use App\Http\Requests\API\UpdateBoxConsultaAPIRequest;
use App\Models\BoxConsulta;
use App\Repositories\BoxConsultaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class BoxConsultaController
 * @package App\Http\Controllers\API
 */

class BoxConsultaAPIController extends AppBaseController
{
    /** @var  BoxConsultaRepository */
    private $boxConsultaRepository;

    public function __construct(BoxConsultaRepository $boxConsultaRepo)
    {
        $this->boxConsultaRepository = $boxConsultaRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/boxConsultas",
     *      summary="Get a listing of the BoxConsultas.",
     *      tags={"BoxConsulta"},
     *      description="Get all BoxConsultas",
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
     *                  @SWG\Items(ref="#/definitions/BoxConsulta")
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
        $this->boxConsultaRepository->pushCriteria(new RequestCriteria($request));
        $this->boxConsultaRepository->pushCriteria(new LimitOffsetCriteria($request));
        $boxConsultas = $this->boxConsultaRepository->all();

        return $this->sendResponse($boxConsultas->toArray(), 'Box Consultas retrieved successfully');
    }

    /**
     * @param CreateBoxConsultaAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/boxConsultas",
     *      summary="Store a newly created BoxConsulta in storage",
     *      tags={"BoxConsulta"},
     *      description="Store BoxConsulta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="BoxConsulta that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/BoxConsulta")
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
     *                  ref="#/definitions/BoxConsulta"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateBoxConsultaAPIRequest $request)
    {
        $input = $request->all();

        $boxConsultas = $this->boxConsultaRepository->create($input);

        return $this->sendResponse($boxConsultas->toArray(), 'Box Consulta saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/boxConsultas/{id}",
     *      summary="Display the specified BoxConsulta",
     *      tags={"BoxConsulta"},
     *      description="Get BoxConsulta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of BoxConsulta",
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
     *                  ref="#/definitions/BoxConsulta"
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
        /** @var BoxConsulta $boxConsulta */
        $boxConsulta = $this->boxConsultaRepository->findWithoutFail($id);

        if (empty($boxConsulta)) {
            return $this->sendError('Box Consulta not found');
        }

        return $this->sendResponse($boxConsulta->toArray(), 'Box Consulta retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateBoxConsultaAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/boxConsultas/{id}",
     *      summary="Update the specified BoxConsulta in storage",
     *      tags={"BoxConsulta"},
     *      description="Update BoxConsulta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of BoxConsulta",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="BoxConsulta that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/BoxConsulta")
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
     *                  ref="#/definitions/BoxConsulta"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateBoxConsultaAPIRequest $request)
    {
        $input = $request->all();

        /** @var BoxConsulta $boxConsulta */
        $boxConsulta = $this->boxConsultaRepository->findWithoutFail($id);

        if (empty($boxConsulta)) {
            return $this->sendError('Box Consulta not found');
        }

        $boxConsulta = $this->boxConsultaRepository->update($input, $id);

        return $this->sendResponse($boxConsulta->toArray(), 'BoxConsulta updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/boxConsultas/{id}",
     *      summary="Remove the specified BoxConsulta from storage",
     *      tags={"BoxConsulta"},
     *      description="Delete BoxConsulta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of BoxConsulta",
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
        /** @var BoxConsulta $boxConsulta */
        $boxConsulta = $this->boxConsultaRepository->findWithoutFail($id);

        if (empty($boxConsulta)) {
            return $this->sendError('Box Consulta not found');
        }

        $boxConsulta->delete();

        return $this->sendResponse($id, 'Box Consulta deleted successfully');
    }
}
