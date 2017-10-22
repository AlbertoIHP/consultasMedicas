<?php

use App\Models\RecetaMedicamento;
use App\Repositories\RecetaMedicamentoRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RecetaMedicamentoRepositoryTest extends TestCase
{
    use MakeRecetaMedicamentoTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var RecetaMedicamentoRepository
     */
    protected $recetaMedicamentoRepo;

    public function setUp()
    {
        parent::setUp();
        $this->recetaMedicamentoRepo = App::make(RecetaMedicamentoRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateRecetaMedicamento()
    {
        $recetaMedicamento = $this->fakeRecetaMedicamentoData();
        $createdRecetaMedicamento = $this->recetaMedicamentoRepo->create($recetaMedicamento);
        $createdRecetaMedicamento = $createdRecetaMedicamento->toArray();
        $this->assertArrayHasKey('id', $createdRecetaMedicamento);
        $this->assertNotNull($createdRecetaMedicamento['id'], 'Created RecetaMedicamento must have id specified');
        $this->assertNotNull(RecetaMedicamento::find($createdRecetaMedicamento['id']), 'RecetaMedicamento with given id must be in DB');
        $this->assertModelData($recetaMedicamento, $createdRecetaMedicamento);
    }

    /**
     * @test read
     */
    public function testReadRecetaMedicamento()
    {
        $recetaMedicamento = $this->makeRecetaMedicamento();
        $dbRecetaMedicamento = $this->recetaMedicamentoRepo->find($recetaMedicamento->id);
        $dbRecetaMedicamento = $dbRecetaMedicamento->toArray();
        $this->assertModelData($recetaMedicamento->toArray(), $dbRecetaMedicamento);
    }

    /**
     * @test update
     */
    public function testUpdateRecetaMedicamento()
    {
        $recetaMedicamento = $this->makeRecetaMedicamento();
        $fakeRecetaMedicamento = $this->fakeRecetaMedicamentoData();
        $updatedRecetaMedicamento = $this->recetaMedicamentoRepo->update($fakeRecetaMedicamento, $recetaMedicamento->id);
        $this->assertModelData($fakeRecetaMedicamento, $updatedRecetaMedicamento->toArray());
        $dbRecetaMedicamento = $this->recetaMedicamentoRepo->find($recetaMedicamento->id);
        $this->assertModelData($fakeRecetaMedicamento, $dbRecetaMedicamento->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteRecetaMedicamento()
    {
        $recetaMedicamento = $this->makeRecetaMedicamento();
        $resp = $this->recetaMedicamentoRepo->delete($recetaMedicamento->id);
        $this->assertTrue($resp);
        $this->assertNull(RecetaMedicamento::find($recetaMedicamento->id), 'RecetaMedicamento should not exist in DB');
    }
}
