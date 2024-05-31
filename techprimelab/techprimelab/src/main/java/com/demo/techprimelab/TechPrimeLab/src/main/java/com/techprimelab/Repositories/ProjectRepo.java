package com.techprimelab.Repositories;

import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;

import com.techprimelab.Models.Project;

public interface ProjectRepo extends JpaAttributeConverter<Project, Long>{

}
