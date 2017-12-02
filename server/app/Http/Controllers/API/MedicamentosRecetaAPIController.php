<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateMedicamentosRecetaAPIRequest;
use App\Http\Requests\API\UpdateMedicamentosRecetaAPIRequest;
use App\Models\MedicamentosReceta;
use App\Repositories\MedicamentosRecetaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class MedicamentosRecetaController
 * @package App\Http\Controllers\API
 */

class MedicamentosRecetaAPIController extends AppBaseController
{
    /** @var  MedicamentosRecetaRepository */
    private $medicamentosRecetaRepository;

    public function __construct(MedicamentosRecetaRepository $medicamentosRecetaRepo)
    {
        $this->medicamentosRecetaRepository = $medicamentosRecetaRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/medicamentosRecetas",
     *      summary="Get a listing of the MedicamentosRecetas.",
     *      tags={"MedicamentosReceta"},
     *      description="Get all MedicamentosRecetas",
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
     *                  @SWG\Items(ref="#/definitions/MedicamentosReceta")
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
        $this->medicamentosRecetaRepository->pushCriteria(new RequestCriteria($request));
        $this->medicamentosRecetaRepository->pushCriteria(new LimitOffsetCriteria($request));
        $medicamentosRecetas = $this->medicamentosRecetaRepository->all();

        return $this->sendResponse($medicamentosRecetas->toArray(), 'Medicamentos Recetas retrieved successfully');
    }

    /**
     * @param CreateMedicamentosRecetaAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/medicamentosRecetas",
     *      summary="Store a newly created MedicamentosReceta in storage",
     *      tags={"MedicamentosReceta"},
     *      description="Store MedicamentosReceta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="MedicamentosReceta that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/MedicamentosReceta")
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
     *                  ref="#/definitions/MedicamentosReceta"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateMedicamentosRecetaAPIRequest $request)
    {
        $input = $request->all();

        $medicamentosRecetas = $this->medicamentosRecetaRepository->create($input);

        return $this->sendResponse($medicamentosRecetas->toArray(), 'Medicamentos Receta saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/medicamentosRecetas/{id}",
     *      summary="Display the specified MedicamentosReceta",
     *      tags={"MedicamentosReceta"},
     *      description="Get MedicamentosReceta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of MedicamentosReceta",
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
     *                  ref="#/definitions/MedicamentosReceta"
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
        /** @var MedicamentosReceta $medicamentosReceta */
        $medicamentosReceta = $this->medicamentosRecetaRepository->findWithoutFail($id);

        if (empty($medicamentosReceta)) {
            return $this->sendError('Medicamentos Receta not found');
        }

        return $this->sendResponse($medicamentosReceta->toArray(), 'Medicamentos Receta retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateMedicamentosRecetaAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/medicamentosRecetas/{id}",
     *      summary="Update the specified MedicamentosReceta in storage",
     *      tags={"MedicamentosReceta"},
     *      description="Update MedicamentosReceta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of MedicamentosReceta",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="MedicamentosReceta that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/MedicamentosReceta")
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
     *                  ref="#/definitions/MedicamentosReceta"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateMedicamentosRecetaAPIRequest $request)
    {
        $input = $request->all();

        /** @var MedicamentosReceta $medicamentosReceta */
        $medicamentosReceta = $this->medicamentosRecetaRepository->findWithoutFail($id);

        if (empty($medicamentosReceta)) {
            return $this->sendError('Medicamentos Receta not found');
        }

        $medicamentosReceta = $this->medicamentosRecetaRepository->update($input, $id);

        return $this->sendResponse($medicamentosReceta->toArray(), 'MedicamentosReceta updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/medicamentosRecetas/{id}",
     *      summary="Remove the specified MedicamentosReceta from storage",
     *      tags={"MedicamentosReceta"},
     *      description="Delete MedicamentosReceta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of MedicamentosReceta",
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
        /** @var MedicamentosReceta $medicamentosReceta */
        $medicamentosReceta = $this->medicamentosRecetaRepository->findWithoutFail($id);

        if (empty($medicamentosReceta)) {
            return $this->sendError('Medicamentos Receta not found');
        }

        $medicamentosReceta->delete();

        return $this->sendResponse($id, 'Medicamentos Receta deleted successfully');
    }
}
