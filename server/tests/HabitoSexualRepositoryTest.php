<?php

use App\Models\HabitoSexual;
use App\Repositories\HabitoSexualRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class HabitoSexualRepositoryTest extends TestCase
{
    use MakeHabitoSexualTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var HabitoSexualRepository
     */
    protected $habitoSexualRepo;

    public function setUp()
    {
        parent::setUp();
        $this->habitoSexualRepo = App::make(HabitoSexualRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateHabitoSexual()
    {
        $habitoSexual = $this->fakeHabitoSexualData();
        $createdHabitoSexual = $this->habitoSexualRepo->create($habitoSexual);
        $createdHabitoSexual = $createdHabitoSexual->toArray();
        $this->assertArrayHasKey('id', $createdHabitoSexual);
        $this->assertNotNull($createdHabitoSexual['id'], 'Created HabitoSexual must have id specified');
        $this->assertNotNull(HabitoSexual::find($createdHabitoSexual['id']), 'HabitoSexual with given id must be in DB');
        $this->assertModelData($habitoSexual, $createdHabitoSexual);
    }

    /**
     * @test read
     */
    public function testReadHabitoSexual()
    {
        $habitoSexual = $this->makeHabitoSexual();
        $dbHabitoSexual = $this->habitoSexualRepo->find($habitoSexual->id);
        $dbHabitoSexual = $dbHabitoSexual->toArray();
        $this->assertModelData($habitoSexual->toArray(), $dbHabitoSexual);
    }

    /**
     * @test update
     */
    public function testUpdateHabitoSexual()
    {
        $habitoSexual = $this->makeHabitoSexual();
        $fakeHabitoSexual = $this->fakeHabitoSexualData();
        $updatedHabitoSexual = $this->habitoSexualRepo->update($fakeHabitoSexual, $habitoSexual->id);
        $this->assertModelData($fakeHabitoSexual, $updatedHabitoSexual->toArray());
        $dbHabitoSexual = $this->habitoSexualRepo->find($habitoSexual->id);
        $this->assertModelData($fakeHabitoSexual, $dbHabitoSexual->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteHabitoSexual()
    {
        $habitoSexual = $this->makeHabitoSexual();
        $resp = $this->habitoSexualRepo->delete($habitoSexual->id);
        $this->assertTrue($resp);
        $this->assertNull(HabitoSexual::find($habitoSexual->id), 'HabitoSexual should not exist in DB');
    }
}
