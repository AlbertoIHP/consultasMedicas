<?php

namespace App\DataTables;

use App\Models\Paciente;
use Form;
use Yajra\Datatables\Services\DataTable;

class PacienteDataTable extends DataTable
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax()
    {
        return $this->datatables
            ->eloquent($this->query())
            ->addColumn('action', 'pacientes.datatables_actions')
            ->make(true);
    }

    /**
     * Get the query object to be processed by datatables.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $pacientes = Paciente::query();

        return $this->applyScopes($pacientes);
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
            'Persona_id' => ['name' => 'Persona_id', 'data' => 'Persona_id'],
            'TipoSangre_id' => ['name' => 'TipoSangre_id', 'data' => 'TipoSangre_id'],
            'GrupoEtnico_id' => ['name' => 'GrupoEtnico_id', 'data' => 'GrupoEtnico_id'],
            'Ocupacion_id' => ['name' => 'Ocupacion_id', 'data' => 'Ocupacion_id'],
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
        return 'pacientes';
    }
}
