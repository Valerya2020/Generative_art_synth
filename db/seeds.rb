@prototypes_data = [
  {
    name: 'First module / First prototype'
  },
  {
    name: 'First oscillator'
    # ruby hash - это тип данных
  },
  {
    name: 'Abstraction / homework'
  },
  {
    name: 'Oscillator with react components'
    # ruby hash - это тип данных
  },
  {
    name: 'Tone js'
    # ruby hash - это тип данных
  },
  {
    name: 'Effects homework'
    # ruby hash - это тип данных
  },
  {
    name: 'Effects homework 2'
    # ruby hash - это тип данных
  },
  {
    name: 'Effects homework 3'
    # ruby hash - это тип данных
  },
  {
    name: 'UI'
    # ruby hash - это тип данных
  },
  {
    name: 'UI better'
    # ruby hash - это тип данных
  },
  {
    name: 'UI homework'
  },
  {
    name: 'UI homework 2'
  },
  {
    name: 'Composition'
  },
  {
    name: '1st module synth part 1'
  },
  {
    name: '1st module synth part 2'
  },
  {
    name: '1st module synth part 3 rename'
  },
  {
    name: '1st module synth part 4 radiationChannel'
  }
]

def seed
  reset_db
  create_prototypes
end

def reset_db
  Rake::Task['db:drop'].invoke
  Rake::Task['db:create'].invoke
  Rake::Task['db:migrate'].invoke
end

def create_prototypes
  @prototypes_data.each do |prototype_data|
    prototype = Prototype.create!(prototype_data)
    puts "#{prototype.name} prototype just created"
  end
end

seed
