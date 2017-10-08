<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateComunaAPIRequest;
use App\Http\Requests\API\UpdateComunaAPIRequest;
use App\Models\Comuna;
use App\Repositories\ComunaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class ComunaController
 * @package App\Http\Controllers\API
 */

class ComunaAPIController extends AppBaseController
{
    /** @var  ComunaRepository */
    private $comunaRepository;

    public function __construct(ComunaRepository $comunaRepo)
    {
        $this->comunaRepository = $comunaRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/comunas",
     *      summary="Get a listing of the Comunas.",
     *      tags={"Comuna"},
     *      description="Get all Comunas",
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
     *                  @SWG\Items(ref="#/definitions/Comuna")
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
        $this->comunaRepository->pushCriteria(new RequestCriteria($request));
        $this->comunaRepository->pushCriteria(new LimitOffsetCriteria($request));
        $comunas = $this->comunaRepository->all();

        return $this->sendResponse($comunas->toArray(), 'Comunas retrieved successfully');
    }

    /**
     * @param CreateComunaAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/comunas",
     *      summary="Store a newly created Comuna in storage",
     *      tags={"Comuna"},
     *      description="Store Comuna",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Comuna that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Comuna")
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
     *                  ref="#/definitions/Comuna"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateComunaAPIRequest $request)
    {
        $input = $request->all();

        $comunas = $this->comunaRepository->create($input);

        return $this->sendResponse($comunas->toArray(), 'Comuna saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/comunas/{id}",
     *      summary="Display the specified Comuna",
     *      tags={"Comuna"},
     *      description="Get Comuna",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Comuna",
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
     *                  ref="#/definitions/Comuna"
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
        /** @var Comuna $comuna */
        $comuna = $this->comunaRepository->findWithoutFail($id);

        if (empty($comuna)) {
            return $this->sendError('Comuna not found');
        }

        return $this->sendResponse($comuna->toArray(), 'Comuna retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateComunaAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/comunas/{id}",
     *      summary="Update the specified Comuna in storage",
     *      tags={"Comuna"},
     *      description="Update Comuna",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Comuna",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Comuna that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Comuna")
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
     *                  ref="#/definitions/Comuna"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateComunaAPIRequest $request)
    {
        $input = $request->all();

        /** @var Comuna $comuna */
        $comuna = $this->comunaRepository->findWithoutFail($id);

        if (empty($comuna)) {
            return $this->sendError('Comuna not found');
        }

        $comuna = $this->comunaRepository->update($input, $id);

        return $this->sendResponse($comuna->toArray(), 'Comuna updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/comunas/{id}",
     *      summary="Remove the specified Comuna from storage",
     *      tags={"Comuna"},
     *      description="Delete Comuna",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Comuna",
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
        /** @var Comuna $comuna */
        $comuna = $this->comunaRepository->findWithoutFail($id);

        if (empty($comuna)) {
            return $this->sendError('Comuna not found');
        }

        $comuna->delete();

        return $this->sendResponse($id, 'Comuna deleted successfully');
    }
}
