<?php

use App\Models\MedicamentosReceta;
use App\Repositories\MedicamentosRecetaRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MedicamentosRecetaRepositoryTest extends TestCase
{
    use MakeMedicamentosRecetaTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var MedicamentosRecetaRepository
     */
    protected $medicamentosRecetaRepo;

    public function setUp()
    {
        parent::setUp();
        $this->medicamentosRecetaRepo = App::make(MedicamentosRecetaRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateMedicamentosReceta()
    {
        $medicamentosReceta = $this->fakeMedicamentosRecetaData();
        $createdMedicamentosReceta = $this->medicamentosRecetaRepo->create($medicamentosReceta);
        $createdMedicamentosReceta = $createdMedicamentosReceta->toArray();
        $this->assertArrayHasKey('id', $createdMedicamentosReceta);
        $this->assertNotNull($createdMedicamentosReceta['id'], 'Created MedicamentosReceta must have id specified');
        $this->assertNotNull(MedicamentosReceta::find($createdMedicamentosReceta['id']), 'MedicamentosReceta with given id must be in DB');
        $this->assertModelData($medicamentosReceta, $createdMedicamentosReceta);
    }

    /**
     * @test read
     */
    public function testReadMedicamentosReceta()
    {
        $medicamentosReceta = $this->makeMedicamentosReceta();
        $dbMedicamentosReceta = $this->medicamentosRecetaRepo->find($medicamentosReceta->id);
        $dbMedicamentosReceta = $dbMedicamentosReceta->toArray();
        $this->assertModelData($medicamentosReceta->toArray(), $dbMedicamentosReceta);
    }

    /**
     * @test update
     */
    public function testUpdateMedicamentosReceta()
    {
        $medicamentosReceta = $this->makeMedicamentosReceta();
        $fakeMedicamentosReceta = $this->fakeMedicamentosRecetaData();
        $updatedMedicamentosReceta = $this->medicamentosRecetaRepo->update($fakeMedicamentosReceta, $medicamentosReceta->id);
        $this->assertModelData($fakeMedicamentosReceta, $updatedMedicamentosReceta->toArray());
        $dbMedicamentosReceta = $this->medicamentosRecetaRepo->find($medicamentosReceta->id);
        $this->assertModelData($fakeMedicamentosReceta, $dbMedicamentosReceta->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteMedicamentosReceta()
    {
        $medicamentosReceta = $this->makeMedicamentosReceta();
        $resp = $this->medicamentosRecetaRepo->delete($medicamentosReceta->id);
        $this->assertTrue($resp);
        $this->assertNull(MedicamentosReceta::find($medicamentosReceta->id), 'MedicamentosReceta should not exist in DB');
    }
}
