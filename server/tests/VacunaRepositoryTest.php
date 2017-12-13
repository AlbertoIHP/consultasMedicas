<?php

use App\Models\Vacuna;
use App\Repositories\VacunaRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class VacunaRepositoryTest extends TestCase
{
    use MakeVacunaTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var VacunaRepository
     */
    protected $vacunaRepo;

    public function setUp()
    {
        parent::setUp();
        $this->vacunaRepo = App::make(VacunaRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateVacuna()
    {
        $vacuna = $this->fakeVacunaData();
        $createdVacuna = $this->vacunaRepo->create($vacuna);
        $createdVacuna = $createdVacuna->toArray();
        $this->assertArrayHasKey('id', $createdVacuna);
        $this->assertNotNull($createdVacuna['id'], 'Created Vacuna must have id specified');
        $this->assertNotNull(Vacuna::find($createdVacuna['id']), 'Vacuna with given id must be in DB');
        $this->assertModelData($vacuna, $createdVacuna);
    }

    /**
     * @test read
     */
    public function testReadVacuna()
    {
        $vacuna = $this->makeVacuna();
        $dbVacuna = $this->vacunaRepo->find($vacuna->id);
        $dbVacuna = $dbVacuna->toArray();
        $this->assertModelData($vacuna->toArray(), $dbVacuna);
    }

    /**
     * @test update
     */
    public function testUpdateVacuna()
    {
        $vacuna = $this->makeVacuna();
        $fakeVacuna = $this->fakeVacunaData();
        $updatedVacuna = $this->vacunaRepo->update($fakeVacuna, $vacuna->id);
        $this->assertModelData($fakeVacuna, $updatedVacuna->toArray());
        $dbVacuna = $this->vacunaRepo->find($vacuna->id);
        $this->assertModelData($fakeVacuna, $dbVacuna->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteVacuna()
    {
        $vacuna = $this->makeVacuna();
        $resp = $this->vacunaRepo->delete($vacuna->id);
        $this->assertTrue($resp);
        $this->assertNull(Vacuna::find($vacuna->id), 'Vacuna should not exist in DB');
    }
}
