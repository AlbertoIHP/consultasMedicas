<?php

namespace App\DataTables;

use App\Models\EnfermedadesCronicasPaciente;
use Form;
use Yajra\Datatables\Services\DataTable;

class EnfermedadesCronicasPacienteDataTable extends DataTable
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax()
    {
        return $this->datatables
            ->eloquent($this->query())
            ->addColumn('action', 'enfermedades_cronicas_pacientes.datatables_actions')
            ->make(true);
    }

    /**
     * Get the query object to be processed by datatables.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $enfermedadesCronicasPacientes = EnfermedadesCronicasPaciente::query();

        return $this->applyScopes($enfermedadesCronicasPacientes);
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\Datatables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
            ->columns($this->getColumns())
            ->addAction(['width' => '10%'])
            ->ajax('')
            ->parameters([
                'dom' => 'Bfrtip',
                'scrollX' => false,
                'buttons' => [
                    'print',
                    'reset',
                    'reload',
                    [
                         'extend'  => 'collection',
                         'text'    => '<i class="fa fa-download"></i> Export',
                         'buttons' => [
                             'csv',
                             'excel',
                             'pdf',
                         ],
                    ],
                    'colvis'
                ]
            ]);
    }

    /**
     * Get columns.
     *
     * @return array
     */
    private function getColumns()
    {
        return [
            'fechaDeteccion' => ['name' => 'fechaDeteccion', 'data' => 'fechaDeteccion'],
            'EnfermedadCronica_id' => ['name' => 'EnfermedadCronica_id', 'data' => 'EnfermedadCronica_id'],
            'Paciente_id' => ['name' => 'Paciente_id', 'data' => 'Paciente_id'],
            'remember_token' => ['name' => 'remember_token', 'data' => 'remember_token']
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'enfermedadesCronicasPacientes';
    }
}
