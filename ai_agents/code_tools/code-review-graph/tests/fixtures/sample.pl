use strict;
use warnings;
use File::Basename;

package Animal;

sub new {
    my ($class, %args) = @_;
    return bless \%args, $class;
}

sub speak {
    my ($self) = @_;
    return "...";
}

package Dog;

sub new {
    my ($class, %args) = @_;
    my $self = Animal::new($class, %args);
    return $self;
}

sub fetch {
    my ($self, $item) = @_;
    return "Fetched $item";
}

sub bark {
    my ($self) = @_;
    print $self->speak() . "\n";
}
