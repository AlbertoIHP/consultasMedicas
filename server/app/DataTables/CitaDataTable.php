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
            'Consulta_idConsulta' => ['name' => 'Consulta_idConsulta', 'data' => 'Consulta_idConsulta'],
            'Doctor_rut' => ['name' => 'Doctor_rut', 'data' => 'Doctor_rut'],
            'Persona_rut' => ['name' => 'Persona_rut', 'data' => 'Persona_rut'],
            'fechahora' => ['name' => 'fechahora', 'data' => 'fechahora'],
            'EstadoCita_idEstadoCita' => ['name' => 'EstadoCita_idEstadoCita', 'data' => 'EstadoCita_idEstadoCita']
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
