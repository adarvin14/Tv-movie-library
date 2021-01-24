class CatalogsController < ApplicationController
  before_action :set_catalog, only: [:show, :update, :destroy]

  # GET /catalogs
  def index
    @catalogs = Catalog.all
    render json: @catalogs
  end

  # GET /catalogs/1
  def show
    render json: @catalog
  end

  # POST /catalogs
  def create
    @catalog = Catalog.new(catalog_params)
    if @catalog.save
      render json: @catalog
    else
      render json: @catalog.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /catalogs/1
  def update
    if @catalog.update(catalog_params)
      render json: @catalog
    else
      render json: @catalog.errors, status: :unprocessable_entity
    end
  end

  # DELETE /catalogs/1
  def destroy
    @catalog.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_catalog
      @catalog = Catalog.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def catalog_params
      params.require(:catalog).permit(:name)
    end
end
