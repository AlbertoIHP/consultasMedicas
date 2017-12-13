<?php

namespace App\DataTables;

use App\Models\AlergiasComunesPaciente;
use Form;
use Yajra\Datatables\Services\DataTable;

class AlergiasComunesPacienteDataTable extends DataTable
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax()
    {
        return $this->datatables
            ->eloquent($this->query())
            ->addColumn('action', 'alergias_comunes_pacientes.datatables_actions')
            ->make(true);
    }

    /**
     * Get the query object to be processed by datatables.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $alergiasComunesPacientes = AlergiasComunesPaciente::query();

        return $this->applyScopes($alergiasComunesPacientes);
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
            'Alergia_id' => ['name' => 'Alergia_id', 'data' => 'Alergia_id'],
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
        return 'alergiasComunesPacientes';
    }
}
