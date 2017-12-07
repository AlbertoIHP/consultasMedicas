<?php

use App\Models\Alergia;
use App\Repositories\AlergiaRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AlergiaRepositoryTest extends TestCase
{
    use MakeAlergiaTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var AlergiaRepository
     */
    protected $alergiaRepo;

    public function setUp()
    {
        parent::setUp();
        $this->alergiaRepo = App::make(AlergiaRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateAlergia()
    {
        $alergia = $this->fakeAlergiaData();
        $createdAlergia = $this->alergiaRepo->create($alergia);
        $createdAlergia = $createdAlergia->toArray();
        $this->assertArrayHasKey('id', $createdAlergia);
        $this->assertNotNull($createdAlergia['id'], 'Created Alergia must have id specified');
        $this->assertNotNull(Alergia::find($createdAlergia['id']), 'Alergia with given id must be in DB');
        $this->assertModelData($alergia, $createdAlergia);
    }

    /**
     * @test read
     */
    public function testReadAlergia()
    {
        $alergia = $this->makeAlergia();
        $dbAlergia = $this->alergiaRepo->find($alergia->id);
        $dbAlergia = $dbAlergia->toArray();
        $this->assertModelData($alergia->toArray(), $dbAlergia);
    }

    /**
     * @test update
     */
    public function testUpdateAlergia()
    {
        $alergia = $this->makeAlergia();
        $fakeAlergia = $this->fakeAlergiaData();
        $updatedAlergia = $this->alergiaRepo->update($fakeAlergia, $alergia->id);
        $this->assertModelData($fakeAlergia, $updatedAlergia->toArray());
        $dbAlergia = $this->alergiaRepo->find($alergia->id);
        $this->assertModelData($fakeAlergia, $dbAlergia->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteAlergia()
    {
        $alergia = $this->makeAlergia();
        $resp = $this->alergiaRepo->delete($alergia->id);
        $this->assertTrue($resp);
        $this->assertNull(Alergia::find($alergia->id), 'Alergia should not exist in DB');
    }
}
