<?php

namespace App\DataTables;

use App\Models\Cita;
use Form;
use Yajra\Datatables\Services\DataTable;

class CitaDataTable extends DataTable
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax()
    {
        return $this->datatables
            ->eloquent($this->query())
            ->addColumn('action', 'citas.datatables_actions')
            ->make(true);
    }

    /**
     * Get the query object to be processed by datatables.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $citas = Cita::query();

        return $this->applyScopes($citas);
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
            'fecha' => ['name' => 'fecha', 'data' => 'fecha'],
            'hora' => ['name' => 'hora', 'data' => 'hora'],
            'EstadoCita_id' => ['name' => 'EstadoCita_id', 'data' => 'EstadoCita_id'],
            'BoxConsulta_id' => ['name' => 'BoxConsulta_id', 'data' => 'BoxConsulta_id'],
            'Paciente_id' => ['name' => 'Paciente_id', 'data' => 'Paciente_id'],
            'Medico_id' => ['name' => 'Medico_id', 'data' => 'Medico_id'],
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
        return 'citas';
    }
}
