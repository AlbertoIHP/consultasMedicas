<?php

namespace App\Http\Controllers;

use App\DataTables\BoxConsultaDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateBoxConsultaRequest;
use App\Http\Requests\UpdateBoxConsultaRequest;
use App\Repositories\BoxConsultaRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class BoxConsultaController extends AppBaseController
{
    /** @var  BoxConsultaRepository */
    private $boxConsultaRepository;

    public function __construct(BoxConsultaRepository $boxConsultaRepo)
    {
        $this->boxConsultaRepository = $boxConsultaRepo;
    }

    /**
     * Display a listing of the BoxConsulta.
     *
     * @param BoxConsultaDataTable $boxConsultaDataTable
     * @return Response
     */
    public function index(BoxConsultaDataTable $boxConsultaDataTable)
    {
        return $boxConsultaDataTable->render('box_consultas.index');
    }

    /**
     * Show the form for creating a new BoxConsulta.
     *
     * @return Response
     */
    public function create()
    {
        return view('box_consultas.create');
    }

    /**
     * Store a newly created BoxConsulta in storage.
     *
     * @param CreateBoxConsultaRequest $request
     *
     * @return Response
     */
    public function store(CreateBoxConsultaRequest $request)
    {
        $input = $request->all();

        $boxConsulta = $this->boxConsultaRepository->create($input);

        Flash::success('Box Consulta saved successfully.');

        return redirect(route('boxConsultas.index'));
    }

    /**
     * Display the specified BoxConsulta.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $boxConsulta = $this->boxConsultaRepository->findWithoutFail($id);

        if (empty($boxConsulta)) {
            Flash::error('Box Consulta not found');

            return redirect(route('boxConsultas.index'));
        }

        return view('box_consultas.show')->with('boxConsulta', $boxConsulta);
    }

    /**
     * Show the form for editing the specified BoxConsulta.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $boxConsulta = $this->boxConsultaRepository->findWithoutFail($id);

        if (empty($boxConsulta)) {
            Flash::error('Box Consulta not found');

            return redirect(route('boxConsultas.index'));
        }

        return view('box_consultas.edit')->with('boxConsulta', $boxConsulta);
    }

    /**
     * Update the specified BoxConsulta in storage.
     *
     * @param  int              $id
     * @param UpdateBoxConsultaRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateBoxConsultaRequest $request)
    {
        $boxConsulta = $this->boxConsultaRepository->findWithoutFail($id);

        if (empty($boxConsulta)) {
            Flash::error('Box Consulta not found');

            return redirect(route('boxConsultas.index'));
        }

        $boxConsulta = $this->boxConsultaRepository->update($request->all(), $id);

        Flash::success('Box Consulta updated successfully.');

        return redirect(route('boxConsultas.index'));
    }

    /**
     * Remove the specified BoxConsulta from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $boxConsulta = $this->boxConsultaRepository->findWithoutFail($id);

        if (empty($boxConsulta)) {
            Flash::error('Box Consulta not found');

            return redirect(route('boxConsultas.index'));
        }

        $this->boxConsultaRepository->delete($id);

        Flash::success('Box Consulta deleted successfully.');

        return redirect(route('boxConsultas.index'));
    }
}
