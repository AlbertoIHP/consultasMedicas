<?php

use App\Models\UsoMedicamento;
use App\Repositories\UsoMedicamentoRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UsoMedicamentoRepositoryTest extends TestCase
{
    use MakeUsoMedicamentoTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var UsoMedicamentoRepository
     */
    protected $usoMedicamentoRepo;

    public function setUp()
    {
        parent::setUp();
        $this->usoMedicamentoRepo = App::make(UsoMedicamentoRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateUsoMedicamento()
    {
        $usoMedicamento = $this->fakeUsoMedicamentoData();
        $createdUsoMedicamento = $this->usoMedicamentoRepo->create($usoMedicamento);
        $createdUsoMedicamento = $createdUsoMedicamento->toArray();
        $this->assertArrayHasKey('id', $createdUsoMedicamento);
        $this->assertNotNull($createdUsoMedicamento['id'], 'Created UsoMedicamento must have id specified');
        $this->assertNotNull(UsoMedicamento::find($createdUsoMedicamento['id']), 'UsoMedicamento with given id must be in DB');
        $this->assertModelData($usoMedicamento, $createdUsoMedicamento);
    }

    /**
     * @test read
     */
    public function testReadUsoMedicamento()
    {
        $usoMedicamento = $this->makeUsoMedicamento();
        $dbUsoMedicamento = $this->usoMedicamentoRepo->find($usoMedicamento->id);
        $dbUsoMedicamento = $dbUsoMedicamento->toArray();
        $this->assertModelData($usoMedicamento->toArray(), $dbUsoMedicamento);
    }

    /**
     * @test update
     */
    public function testUpdateUsoMedicamento()
    {
        $usoMedicamento = $this->makeUsoMedicamento();
        $fakeUsoMedicamento = $this->fakeUsoMedicamentoData();
        $updatedUsoMedicamento = $this->usoMedicamentoRepo->update($fakeUsoMedicamento, $usoMedicamento->id);
        $this->assertModelData($fakeUsoMedicamento, $updatedUsoMedicamento->toArray());
        $dbUsoMedicamento = $this->usoMedicamentoRepo->find($usoMedicamento->id);
        $this->assertModelData($fakeUsoMedicamento, $dbUsoMedicamento->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteUsoMedicamento()
    {
        $usoMedicamento = $this->makeUsoMedicamento();
        $resp = $this->usoMedicamentoRepo->delete($usoMedicamento->id);
        $this->assertTrue($resp);
        $this->assertNull(UsoMedicamento::find($usoMedicamento->id), 'UsoMedicamento should not exist in DB');
    }
}
