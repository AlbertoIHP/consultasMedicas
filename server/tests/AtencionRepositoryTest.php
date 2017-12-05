<?php

use App\Models\Atencion;
use App\Repositories\AtencionRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AtencionRepositoryTest extends TestCase
{
    use MakeAtencionTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var AtencionRepository
     */
    protected $atencionRepo;

    public function setUp()
    {
        parent::setUp();
        $this->atencionRepo = App::make(AtencionRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateAtencion()
    {
        $atencion = $this->fakeAtencionData();
        $createdAtencion = $this->atencionRepo->create($atencion);
        $createdAtencion = $createdAtencion->toArray();
        $this->assertArrayHasKey('id', $createdAtencion);
        $this->assertNotNull($createdAtencion['id'], 'Created Atencion must have id specified');
        $this->assertNotNull(Atencion::find($createdAtencion['id']), 'Atencion with given id must be in DB');
        $this->assertModelData($atencion, $createdAtencion);
    }

    /**
     * @test read
     */
    public function testReadAtencion()
    {
        $atencion = $this->makeAtencion();
        $dbAtencion = $this->atencionRepo->find($atencion->id);
        $dbAtencion = $dbAtencion->toArray();
        $this->assertModelData($atencion->toArray(), $dbAtencion);
    }

    /**
     * @test update
     */
    public function testUpdateAtencion()
    {
        $atencion = $this->makeAtencion();
        $fakeAtencion = $this->fakeAtencionData();
        $updatedAtencion = $this->atencionRepo->update($fakeAtencion, $atencion->id);
        $this->assertModelData($fakeAtencion, $updatedAtencion->toArray());
        $dbAtencion = $this->atencionRepo->find($atencion->id);
        $this->assertModelData($fakeAtencion, $dbAtencion->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteAtencion()
    {
        $atencion = $this->makeAtencion();
        $resp = $this->atencionRepo->delete($atencion->id);
        $this->assertTrue($resp);
        $this->assertNull(Atencion::find($atencion->id), 'Atencion should not exist in DB');
    }
}
