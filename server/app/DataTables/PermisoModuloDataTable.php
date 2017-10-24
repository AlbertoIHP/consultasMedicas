<?php

namespace App\DataTables;

use App\Models\PermisoModulo;
use Form;
use Yajra\Datatables\Services\DataTable;

class PermisoModuloDataTable extends DataTable
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax()
    {
        return $this->datatables
            ->eloquent($this->query())
            ->addColumn('action', 'permiso_modulos.datatables_actions')
            ->make(true);
    }

    /**
     * Get the query object to be processed by datatables.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $permisoModulos = PermisoModulo::query();

        return $this->applyScopes($permisoModulos);
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
            'Role_id' => ['name' => 'Role_id', 'data' => 'Role_id'],
            'Modulo_id' => ['name' => 'Modulo_id', 'data' => 'Modulo_id'],
            'write' => ['name' => 'write', 'data' => 'write'],
            'delete' => ['name' => 'delete', 'data' => 'delete'],
            'update' => ['name' => 'update', 'data' => 'update'],
            'view' => ['name' => 'view', 'data' => 'view']
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'permisoModulos';
    }
}
