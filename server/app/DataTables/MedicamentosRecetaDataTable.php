<?php

namespace App\DataTables;

use App\Models\MedicamentosReceta;
use Form;
use Yajra\Datatables\Services\DataTable;

class MedicamentosRecetaDataTable extends DataTable
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax()
    {
        return $this->datatables
            ->eloquent($this->query())
            ->addColumn('action', 'medicamentos_recetas.datatables_actions')
            ->make(true);
    }

    /**
     * Get the query object to be processed by datatables.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $medicamentosRecetas = MedicamentosReceta::query();

        return $this->applyScopes($medicamentosRecetas);
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
            'dosis' => ['name' => 'dosis', 'data' => 'dosis'],
            'cantidad' => ['name' => 'cantidad', 'data' => 'cantidad'],
            'tiempo' => ['name' => 'tiempo', 'data' => 'tiempo'],
            'intervalo' => ['name' => 'intervalo', 'data' => 'intervalo'],
            'Medicamento_id' => ['name' => 'Medicamento_id', 'data' => 'Medicamento_id'],
            'ViaAdministracionMedicamento_id' => ['name' => 'ViaAdministracionMedicamento_id', 'data' => 'ViaAdministracionMedicamento_id'],
            'Receta_id' => ['name' => 'Receta_id', 'data' => 'Receta_id'],
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
        return 'medicamentosRecetas';
    }
}
